import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Button} from 'native-base';


class LikeButton extends React.Component {

  constructor(props){

    super(props);
    this.state = {
      likes: 124,
      updated: false
    };

  }

  updateLikes = () => {

    if(!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes + 1,
          updated: true
	
        };
      });

    } else {

      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          updated: false
        };
      });
    }
  }
  
  
  

  render(){	  	  
    return(
    <View>
	   <Icon active name="md-heart" onPress={this.updateLikes}/>
       <Text>{this.state.likes}</Text>
	  </View>      
    );
  }
}

export default LikeButton;