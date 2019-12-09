import React, { Component } from 'react';
import { Container, Content, Card, CardItem, List, ListItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import styles from '../screens/styles.js';
import {User} from "../database/User.js"

const tempImage = require('../screens/assets/dog.png');

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

    render(){
        return(        
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{uri: this.state.user.profileImage}} style={styles.circleSmall}  />
              </Left>
              <Body>
                {/* TODO: name props from posts component */}
                <Text>{this.state.user.username}</Text>
                <Text note>{this.props.body}</Text>
              </Body>
              <Right>                
                <Text note>{this.props.time}</Text> 
              </Right>
            </ListItem>
          </List>
        );        
    }
}
export default Comment;