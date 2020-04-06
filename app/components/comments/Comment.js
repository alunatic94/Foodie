
import React, { Component } from 'react';
import { Container, Content, Card, CardItem, List, ListItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header, Footer, View, Input } from 'native-base';
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
      user: User.dummyUser
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

  handleReply = () => {
    console.log('Reply comment')
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
            <Text
                onPress={this.props.handleReply}
                maxLength={5}
                selectionColor={"white"}
                style={{paddingLeft: 60}}
                defaultValue={"Reply"}
                >Reply
            </Text>
          </List>          
        );
    }
}
export default Comment; 