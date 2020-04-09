
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
      showPostButton: false
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

  onChange = (comment) => {  
    
  }

  handleReply = (comment) => {
    console.log('Reply comment')
    this.setState({
      showPostButton: true,
      comment: comment,
      buttonTextColor: '#0fd90d'
    });
    this.props.handleReply()
       
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
            <ListItem noBorder>
            <TextInput                
                onFocus={(comment)=>this.handleReply(comment)}
                selectionColor={"white"}
                style={{paddingLeft: 60}}
                placeholder={"Reply"}
                >
            </TextInput>
            {this.state.showPostButton && (
                        <Button transparent rounded
                        style={styles.postButton}
                        disabled={!this.state.comment}
                    >
                        <Text style={{color: this.state.buttonTextColor}}>Post</Text>
                    </Button>)}
            </ListItem>
          </List>
        );
    }
}
export default Comment; 