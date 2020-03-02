import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Button } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, firebase } from "../database/Database.js";
import { User } from "../database/User.js";
import { withNavigation, ScrollView } from "react-navigation";
import Comment from "../components/Comment.js";
import styles from '../screens/styles.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { ref } from '@hapi/joi';


class LikeButton extends React.Component {
  //state={postData:null}
  componentDidMount() {
  }

  componentDidUpdate(prevProps) {

  }

  constructor(props) {

    super(props);


    //var postData=db.collection('posts').doc(this.props.postID).get()

    this.state = {
      like: '0', // In constructor we should read DB to see how many likes a post currently has
      updated: false,
      hearto: false,

      //likesArray: [],
      //buttonTextColor: '#0065ff',
      //user: User.dummyUser 

    };

  }


  updateLikes = () => {
    likeRef = db.collection('posts').doc(this.props.postID);
    decrement = firebase.firestore.FieldValue.increment(-1);
    increment = firebase.firestore.FieldValue.increment(1);

    if (!this.state.updated) {
      this.setState((prevState, props) => {
        likeRef.update({ likes: increment });
        return {
          like: prevState.like + 1,
          updated: true

        };

      });

    } else {

      this.setState((prevState, props) => {
        likeRef.update({ likes: decrement });
        return {
          like: prevState.like - 1,
          updated: false
        };
      });

    }
  }



  render() {

    const { hearts, heart, updated, firez, fire } = this.state;


    return (
      <View style={color = 'white'}>
        <Button transparent>
          <Text>Like:{this.state.like}</Text>
          <MaterialCommunityIcons name={firez ? "fire" : "fire"} color={updated ? 'red' : 'rgb(237, 237, 237)'} size={45} onPress={this.updateLikes} />
        </Button>
      </View>

    );
  }
}

export default LikeButton;