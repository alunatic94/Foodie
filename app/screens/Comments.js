import React, { Component } from "react";
import {
  Container,
  Input,
  Left,
  Item,
  Icon,
  Thumbnail,
  Button,
  Header,
  Footer,
  Content,
  ListItem,
  Right
} from "native-base";
import { withNavigation, ScrollView } from "react-navigation";
import Comment from "../components/Comment.js";
import { KeyboardAvoidingView, Text, AppState } from "react-native";
import styles from './styles.js';
import { db } from "../database/Database.js";
import {User} from "../database/User.js";
import CommentPagePlaceHolder  from '../components/placeholders/CommentPagePlaceHolder.js';

const tempImage = require('../screens/assets/dog.png');
// TODO:
// 1. change buttonTextColor when input is empty
// 2. update with user info
// 3. structure time
// 4. Disable footer scroll
class Comments extends Component {
  comments = db
    .collection("posts")
    .doc(this.props.navigation.getParam('postID', 'Qe1PUrFY32K8EYL9UYqW')) //this.props.postsid -> Needs to be pasted from posts
    .collection("comments");

  time = new Date();

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      commentsArray: [],
      isLoaded: false,
      buttonTextColor: '#0065ff',
      user: User.dummyUser     
    };
  }
  
  componentDidMount() {
    this.setState({
      isLoaded:true,
  })
    this.getAll();
    const query = this.comments
    const listener = query.onSnapshot(querySnapshot => {
      this.getAll();
    }, err => {
      console.log('There was an error');
    });    
  }
  
  loadUser = () => {
    User.getCurrent().then((loadedUser) => {
        this.setState({
            user: loadedUser,
        })
    })
    .catch((err) => {
        console.log(err + ":" + "Could not load user [id = " + this.props.userID + "] for comment");
    })
}

  componentWillUnmount() {
    // remove database listener
    const unMountListener = this.comments.onSnapshot(() => {
    });
  }

  onChange = (comment) => {  
      this.setState({
        comment: comment,
        buttonTextColor: '#0fd90d'
      });   
  }  

  handleSubmit = event => {
    event.preventDefault();
    this.add(this.state.comment);    
    this.setState({
      comment: "",
      buttonTextColor: '#0065ff',
    });    
  };


  add = comment => {
    let commentData = {
      body: comment,
      time: this.time.getTime(),
      userID: User.getCurrentUserID()      
    };
    this.comments.doc().set(commentData);
  };

  getAll = () => {
    const allComments = this.comments
      .orderBy('time', 'asc')
      .get()
      .then(snapshot => {
        let existingComments = [];
        snapshot.forEach(doc => {
          existingComments.push(doc.data());
        });
        this.setState({commentsArray: existingComments});
      })
      .catch(err => {
        console.log("Error getting comments ", err);
      });
  };

  render() {
    if(this.state.isLoaded){
    return (
      <Container>        
        <Header>
          <Left>
            <Button
              iconLeft
              light
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">  
          <ScrollView>          
            {this.state.commentsArray.map((comment, index) => (
              <Comment body={comment.body} time={comment.time} key={index} userID={comment.userID}/>
            ))}
          </ScrollView>          
          <Footer>
          <Container style={styles.commentsFooter}>
            <ListItem avatar >
              <Left>
                <Thumbnail small source={{uri: this.state.user.profileImage}} />
              </Left>
            </ListItem>            
              <Content>            
                <Item rounded >
                  <Input
                    placeholder="Comment"
                    onChangeText={comment => this.onChange(comment)}
                    value={this.state.comment}                    
                  />
                    <Button transparent rounded
                        onPress={this.handleSubmit}
                        disabled={!this.state.comment}
                        style={styles.postButton}
                    >
                        <Text style={{color: this.state.buttonTextColor}}>Post</Text>
                    </Button>                 
                </Item>            
                </Content>            
            </Container>            
          </Footer>
        </KeyboardAvoidingView>
      </Container>
    );
    }
    else
    return (
      <CommentPagePlaceHolder style={this.props.style}/>
    );

  }
}

export default withNavigation(Comments);
