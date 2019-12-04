import React, { Component } from 'react';
import { Container, Content, Card, CardItem, List, ListItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import styles from '../screens/styles.js';

const tempImage = require('../screens/assets/dog.png');

class Comment extends Component{

    render(){
        return(        
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={tempImage} style={styles.circleSmall}  />
              </Left>
              <Body>
                {/* TODO: name props from posts component */}
                <Text>Name</Text>
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