import React, { Component } from 'react';
import { Container, Content, Card, CardItem, List, ListItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';

class Comment extends Component{
    render(){
        return(        
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'image' }} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        );        
    }
}
export default Comment;