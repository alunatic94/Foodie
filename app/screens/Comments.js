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
  ListItem
} from "native-base";
import { withNavigation, ScrollView } from "react-navigation";
import { KeyboardAvoidingView, Text} from "react-native";
import styles from './styles.js';
import { db, firebase } from "../database/Database";
import {User} from "../database/User.js";
import Parent from "../components/comments/Parent.js";
import Moment from 'moment';

const tempImage = require('../screens/assets/dog.png');
// TODO:
// 1. change buttonTextColor when input is empty
// 2. update with user info
// 3. structure time
// 4. Disable footer scroll
class Comments extends Component {
  comments = db
    .collection("posts")
    .doc(this.props.navigation.getParam('postID'))
    .collection("comments");

  time = Moment().format('LT');
  currentPost = db
  .collection("posts")
  .doc(this.props.navigation.getParam('postID')).id
  

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      commentsArray: [],
      buttonTextColor: '#0065ff',
      user: User.dummyUser,
      showFooter: true
    };
  }
  
  componentDidMount() {    
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
            user: loadedUser
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
    const increment = firebase.firestore.FieldValue.increment(1);
    this.users.doc(User.getCurrentUserID()).update({commentCount: increment})
    this.addBadge(); 
  };

  async addBadge() {
    var badgeID = "";
    var numComments; 
    await this.users.doc(User.getCurrentUserID()).get().then((doc)=>{
      if(doc.exists){
        numComments = doc.data().commentCount;
      }
    })
    switch(numComments){
      case 1: 
        badgeID = "first-comment"; 
        break;
      case 20: 
        badgeID = "twenty-comments";
        break; 
      default: 
        badgeID = null; 
    }
    if (badgeID != null) {
      badges = null; 
      await this.users.doc(User.getCurrentUserID()).get().then((doc)=>{
        if(doc.exists){
          badges = doc.data().badges;
        }
      })
      badges.push(badgeID);

      users.doc(User.getCurrentUserID()).update({ badges: badges });
    }
  }

  add = comment => {
    let commentData = {
      body: comment,
      time: this.time,
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

  mainInputBox = () => {
    this.setState({
      showFooter: false
    })
  }

  handleReplyExit = () => {
    this.setState({
      showFooter: true
    })
  }

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
            {this.state.commentsArray.map((comment, index) => (
              <Parent 
                body={comment.body}
                time={comment.time}
                key={index}
                userID={comment.userID}
                postID={this.currentPost}
                hideInput={this.mainInputBox}
                exit={this.handleReplyExit}
              />
            ))}
          </ScrollView>
          {this.state.showFooter && (
            <Footer>
            <Container style={styles.commentsFooter}>
              <ListItem avatar >
                <Left>
                  <Thumbnail small source={{uri: this.state.user.profileImage}} />
                </Left>
              </ListItem>            
                <Content>            
                  <Item rounded>
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
          )}
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default withNavigation(Comments);
