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
  View,
  Toast
} from "native-base";
import { withNavigation, ScrollView } from "react-navigation";
import { KeyboardAvoidingView, Text, Image } from "react-native";
import styles from './styles.js';
import { db, firebase } from "../database/Database";
import {User} from "../database/User.js";
import Parent from "../components/comments/Parent.js";
import Moment from 'moment';
import {AquaMain, badgeColors} from "../styles/global";

// TODO:
// 1. change buttonTextColor when input is empty
// 2. structure time
class Comments extends Component {
  query = db
    .collection("posts")
    .doc(this.props.navigation.getParam('postID'))
    .collection("comments")
    .orderBy('time', 'asc')

  currentPost = db
  .collection("posts")
  .doc(this.props.navigation.getParam('postID')).id

  users = db.collection("users")
  
  time = new Date().getTime()

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: [],
      buttonTextColor: '#0065ff',
      user: User.dummyUser,
      showFooter: true      
    };

  }
  
  componentDidMount() {
    const listener = this.query.onSnapshot(querySnapshot => {
      this.setState({
        comments: querySnapshot.docs.map((snapshot) => snapshot.data())
      })
    }, err => {
      console.log('There was an error');
    });
  }

  componentWillUnmount() {
    // remove database listener
    const unMountListener = this.query.onSnapshot(() => {
    });
  }
  
  loadUser = () => {
    User.getCurrent().then((loadedUser) => {
        this.setState({
            user: loadedUser,
        })
    })
    .catch((err) => {
      console.log("Getting to here in Comments")
        console.log(err + ":" + "Could not load user [id = " + this.props.userID + "] for comment");
    })
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

      let badgeColor = (badgeColors[badgeColor] ? badgeColors[badgeColor] : AquaMain);
      users.doc(User.getCurrentUserID()).update({ badges: badges });
      Toast.show({
        text: `Wow! You earned a badge for commenting ${numComments} times.`,
        buttonText: 'Nice!',
        type: 'success',
        duration: 3000,
        style: {opacity: .95, backgroundColor: badgeColor},
        buttonTextStyle: {color: 'dimgray'}
      })
    }
  }

  add = comment => {
    let commentData = {
      body: comment,
      time: this.time,
      userID: User.getCurrentUserID()
    };
    db
    .collection("posts")
    .doc(this.props.navigation.getParam('postID'))
    .collection("comments")
    .doc()
    .set(commentData);
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
    if(!this.state.isLoaded){
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
            {this.state.comments.map((comment, index) => (
              <Parent 
                body={comment.body}
                time={comment.time}
                key={index}
                userID={comment.userID}
                postID={this.currentPost}
                hideInput={this.mainInputBox}
                exit={this.handleReplyExit}
                children={comment.children}
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
    else    
    return (
      <Content contentContainerStyle={{justifyContent: "center", flex: 1}} >
        <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Image source={require("../styles/assets/loading.gif")}/>            
      </View>
     </Content>
    );

  }
}

export default withNavigation(Comments);
