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

const tempImage = require('../screens/assets/dog.png');
// TODO:
// 1. change buttonTextColor when input is empty
// 2. update with user info
// 3. structure time
// 4. Disable footer scroll
class Comments extends Component {
  comments = db
    .collection("posts")
    .doc("Qe1PUrFY32K8EYL9UYqW") //this.props.postsid -> Needs to be pasted from posts
    .collection("comments");

  time = new Date();

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      commentsArray: [],
      buttonTextColor: '#0065ff'      
    };
  }
  
  componentDidMount() {
    this.getAll();
    const query = this.comments
    const listener = query.onSnapshot(querySnapshot => {
      console.log('${querySnapshot.size}');
      this.getAll();
    }, err => {
      console.log('There was an error');
    });    
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
      console.log(this.state.comment);    
  }  

  handleSubmit = event => {
    event.preventDefault();
    this.add(this.state.comment);    
    this.setState({
      comment: "",
      buttonTextColor: '#0065ff'
    });    
  };

  add = comment => {
    let commentData = {
      body: comment,
      time: this.time.getTime()
      // TODO: user_ID: User.getCurrent()
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
          console.log(doc.data());
          existingComments.push(doc.data());
        });
        this.setState({commentsArray: existingComments});
      })
      .catch(err => {
        console.log("Error getting comments ", err);
      });
  };

  render() {
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
            {this.state.commentsArray.map(comment => (
              <Comment body={comment.body} time={comment.time} />
            ))}
          </ScrollView>          
          <Footer>
          <Container style={styles.commentsFooter}>
            <ListItem avatar >
              <Left>
                <Thumbnail small source={tempImage} />
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
}

export default withNavigation(Comments);
