import React, { Component } from 'react';
import { Container, Content, Card, CardItem, List, ListItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header, Footer, View } from 'native-base';
import styles from '../screens/styles.js';
import {User} from "../database/User.js"

const tempImage = require('../screens/assets/dog.png');

class SubComment extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: User.dummyUser,
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

  handleReplyComment = () => {
    // Handle input, send input
    console.log('Reply commment')
  }

    render(){
        return(
          <List style={{paddingLeft: 45}}>
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
            <Text note
                style={{paddingLeft: 60}}
                onPress={this.handleReplyComment}
                >Reply</Text>
          </List>          
        );
    }
}
export default SubComment;