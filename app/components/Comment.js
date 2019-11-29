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
                <Text>TODO: Name</Text>
                <Text note>{this.props.body} Body</Text>
              </Body>
              <Right>
                {/* TODO: {this.props.time} */}
                <Text note>0:00</Text> 
              </Right>
            </ListItem>
          </List>
        );        
    }
}
export default Comment;