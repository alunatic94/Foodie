import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Button} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db } from "../database/Database.js";
import {User} from "../database/User.js";
import { withNavigation, ScrollView } from "react-navigation";
import Comment from "../components/Comment.js";

class LikeButton extends React.Component {

 

  constructor(props){

    super(props);
    this.state = {
      like: " ",
      updated: false,
      hearto: false,
	  
    };

  }


  updateLikes = () => {

    if(!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          like: prevState.like + 1,
          updated: true
	
        };
      });

    } else {

      this.setState((prevState, props) => {
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
	    <AntDesign name={hearts ? "heart" : "heart"} color={updated ? 'red' : 'rgb(237, 237, 237)'} size={30} onPress={this.updateLikes}/>
        <Text>Likes {this.state.like}</Text>
	   </Button>
	  </View>  
    );
  }
}

export default withNavigation(LikeButton);