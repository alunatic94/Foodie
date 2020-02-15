import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Button} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, firebase } from "../database/Database.js";
import {User} from "../database/User.js";
import { withNavigation, ScrollView } from "react-navigation";
import Comment from "../components/Comment.js";
import styles from '../screens/styles.js';


class LikeButton extends React.Component {
  componentDidMount() {
    
    
    
  }

  componentDidUpdate(prevProps){

  }

  constructor(props){

    super(props);
    this.state = {
      like: "0",
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

    if(!this.state.updated) {
      this.setState((prevState, props) => {
        likeRef.update({ count: increment });
        return {
          like: prevState.like + 1,
          updated: true
	
        };
        
      });

    } else {

      this.setState((prevState, props) => {
        likeRef.update({ count: decrement });
        return {
          like: prevState.like - 1,
          updated: false
        };
      });

    }
  }

  

  render(){
	  
    const { hearts, heart, updated, firez, fire } = this.state;
    

    return(
    <View style= { color= 'white'}>
	   <Button transparent>
     <Text>Likes:{this.state.like}</Text>
	    <AntDesign name={hearts ? "heart" : "heart"} color={updated ? 'red' : 'rgb(237, 237, 237)'} size={30} onPress={this.updateLikes}/> 
	   </Button>
	  </View>  
    );
  }
}

export default LikeButton;