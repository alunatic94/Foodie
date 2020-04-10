
import React, { Component } from 'react';
import { List, ListItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header, Footer, View, Input, Content, Item } from 'native-base';
import styles from '../../screens/styles.js'
import {User} from '../../database/User.js'
import { TextInput } from 'react-native';
import Moment from 'moment';

const tempImage = require('../../screens/assets/dog.png');

// interface Comment {
//   userID: string;
//   padding: number;  
//   body: string;
//   time: number;  
//   handleReply: () => void;
// }

// interface CommentState {
//   user: User;
// }

class Comment extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: User.dummyUser,
      comment: "",
      buttonTextColor: '#0065ff',
      showReplyMenu: false,      
    }    
  }

  componentWillMount() {
    this.loadUser();
 }

 loadUser = () => {
     User.getExisting(this.props.userID).then((loadedUser) => {
         this.setState({
             user: loadedUser
         })
     })
     .catch((err) => {
         console.log(err + ":" + "Could not load user [id = " + this.props.userID + "] for comment");
     })
 }

  handleChange = (comment) => {
    console.log('Reply comment')
    console.log("changing comment: " + comment)
    this.setState({
      comment: comment,
      buttonTextColor: '#0fd90d'
    });
    console.log("Comment after setting state in change: " +  comment)
    console.log("this.state.comment: " +  this.state.comment)
  }  

  displayReplyMenu = () => {
    console.log("Displaying buttons")
    this.setState({
      showReplyMenu: true
    })
    this.props.handleReply()
  }

  handleReplyExit = () => {
    console.log("Pressed exit button")
    this.setState({      
      showReplyMenu: false,
      buttonTextColor: '#0065ff'    
    })
    this.handleChange("")
    console.log("After calling handlechange")
    this.props.showFooter()
    console.log(this.state.comment)
  }


    render(){
        return(
          <List style={{paddingLeft: this.props.padding}}>
            <ListItem noBorder avatar>
              <Left>
                <Thumbnail source={{uri: this.state.user.profileImage}} style={styles.circleSmall}  />
              </Left>
              <Body style={{display: 'flex', flexDirection: 'row'}}>
                <Text>{this.state.user.username}</Text>
                <Text>{this.props.body}</Text>
              </Body>
              <Right>
                <Text note>{this.props.time}</Text>
              </Right>
            </ListItem>
            <TextInput              
                onFocus={this.displayReplyMenu}
                onChangeText={(comment)=>this.handleChange(comment)}
                selectionColor={'#0065ff'}
                style={{paddingLeft: 60}}
                placeholder={"Reply"}
                >
            </TextInput>
            {this.state.showReplyMenu && (
                        <ListItem>
                            <Button small rounded danger
                              onPress={this.handleReplyExit}
                            >
                              <Text>x</Text>
                            </Button>                            
                            <Button transparent rounded
                              style={styles.postButton}
                              disabled={!this.state.comment}
                            >
                              <Text style={{color: this.state.buttonTextColor}}>Post</Text>
                            </Button>
                        </ListItem>
                        )
                    }
          </List>
        );
    }
}
export default Comment; 