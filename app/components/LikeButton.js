import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Button, Container, Grid, Row, Col } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, firebase } from "../database/Database";
import { User } from "../database/User.js";
import { withNavigation, ScrollView } from "react-navigation";
import Comment from "../components/Comment.js";
import styles from '../screens/styles.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LikePage from '../screens/LikePage.js';
//import { ref } from '@hapi/joi';


class LikeButton extends React.Component {
  users = db.collection("users");
  ref = db.collection('posts').doc(this.props.postID);
  liketoinsert = db.collection('posts').doc(this.props.postID).collection('Likeby');
  componentDidMount() {

    this.addLikedByListener();

  }

  removeLikedByListener() {
    this.liketoinsert.doc(User.getCurrentUserID()).onSnapshot(() => {});
}


  constructor(props) {

    super(props);

    this.state = {
      like: this.props.post.likes,
      updated: false,
      liked: false,
      user: User.dummyUser,
      postID: this.props.postID
    }

  }

  addLikedByListener() {
    this.liketoinsert.doc(User.getCurrentUserID()).onSnapshot((doc) => {
      if (doc.exists) {
        this.setState({liked: true});
      }
      else {
        this.setState({liked: false});
      }
    })
  }
  componentDidMount() {

    this.ref.get().then((doc) => {
      ref = doc.data();
      this.setState({
        like: ref.likes,
        updated: false,
        hearto: false,
        liked: false,
        user: User.dummyUser,
        likesArray: [],
        postID: this.props.postID
      })
    });
    this.liketoinsert.doc(User.getCurrentUserID()).get().then((doc) =>{
      if(doc.exists){
        this.setState({
          updated: true, 
          hearto: true, 
          liked: true
        })
      }
    })
  }
  async addBadge() {
    var badgeID = "";
    var numLikes; 
    await this.users.doc(User.getCurrentUserID()).get().then((doc)=>{
      if(doc.exists){
        numLikes = doc.data().likeCount;
      }
    })
    switch(numLikes){
      case 1: 
        badgeID = "first-like"; 
        break;
      case 20: 
        badgeID = "twenty-likes";
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
      duplicate = false; 
      for(i=0; i<badges.length; i++){
        if(badges[i] == badgeID){
          duplicate = true; 
        }
      }
      if(duplicate == false){
        badges.push(badgeID); 
      }

      users.doc(User.getCurrentUserID()).update({ badges: badges });
    }
  }
  add = () => {
    let id = User.getCurrentUserID();
    let likeData = {
      userID: User.getCurrentUserID(),
      timestamp: new Date()

    };
    this.liketoinsert.doc(id).set(likeData)
  };

  remove = () => {
    this.liketoinsert.doc(User.getCurrentUserID()).delete()
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  updateLikes = () => {
    likeRef = db.collection('posts').doc(this.props.postID);
    decrement = firebase.firestore.FieldValue.increment(-1);
    increment = firebase.firestore.FieldValue.increment(1);


    if (!this.state.liked) {
      this.setState({ liked: true });
      this.add();
      this.users.doc(User.getCurrentUserID()).update({likeCount: increment});
      this.setState((prevState, props) => {
        likeRef.update({ likes: increment });
        return {
          like: prevState.like + 1,
          // updated: true,
          // hearto: true,
          liked: true

        };

      });
      this.addBadge(); 
    } else {

      this.remove();
      this.users.doc(User.getCurrentUserID()).update({likeCount: decrement});
      this.setState((prevState, props) => {
        likeRef.update({ likes: decrement });
        //Remove the user from likeby collection in DB
        this.remove();
        return {
          like: prevState.like - 1,
          // updated: false,
          // hearto: false,
          liked: false
        };
      });

    }
  }

  render() {

    return (
      <View style={{color: 'white', display: 'flex', flexDirection: 'row'}}>

          <MaterialCommunityIcons name="fire" color={this.state.liked ? 'red' : 'rgb(237, 237, 237)'} size={35} onPress={this.updateLikes} />          
          
          <Text style={{paddingTop: 10}}
          onPress={() => this.props.navigation.navigate('LikePage', {
          postID: this.props.postID})}
          // style={styles.lightText}
          >{this.state.like} likes</Text>        
      </View>
    );
  }
}

export default withNavigation(LikeButton);