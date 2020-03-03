import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Button, Container} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, firebase } from "../database/Database.js";
import {User} from "../database/User.js";
import { withNavigation, ScrollView } from "react-navigation";
import Comment from "../components/Comment.js";
import styles from '../screens/styles.js';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import LikePage from '../screens/LikePage.js';
//import { ref } from '@hapi/joi';


class LikeButton extends React.Component {
  ref=db.collection('posts').doc(this.props.postID);
  componentDidMount() {

    this.ref.get().then((doc) => {
      ref = doc.data();
      this.setState({
          like: ref.likes,
          updated: false,
          hearto: false
      })
  })
}

  constructor(props){

    super(props);
    
    this.state = {
      like:'',
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

  render(){
	  
    const { hearts, heart, updated, firez, fire } = this.state;
  
    return(
    <View style= { color= 'white'}>

      <Button transparent onPress={() => this.props.navigation.navigate('LikePage')}>
      <Text>Likes:{this.state.like}</Text>
      </Button>

	   <Button transparent>
     <MaterialCommunityIcons name={firez ? "fire" : "fire"} color={updated ? 'red' : 'rgb(237, 237, 237)'} size={45} onPress={this.updateLikes}/>
	   </Button>
    </View>  
    
    );
  }
}

export default withNavigation(LikeButton);