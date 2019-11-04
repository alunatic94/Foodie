import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class MainHeader extends Component {
  render() {
    return (
        <Header>
          <Left>
            <Button transparent onPress = {() => alert("Clicked On Button !!!")}>
              <AntDesign name='pluscircle' style={{fontSize: 30, color: 'white'}} />
            </Button>
          </Left>

          <Body>
         
          </Body>

          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
    );
  }
}