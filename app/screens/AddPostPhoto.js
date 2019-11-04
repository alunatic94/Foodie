import React, { Component } from 'react';
import { Container, Header, Left, Right, Body, Content, Button, Text } from 'native-base';
export default class AddPostPhoto extends Component {
  render() {
    return (
      <Container>
         <Header>
            <Left>
                <Button 
                     transparent
                     onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                     <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
                </Button>
            </Left>

            <Body>
              <Text>Post a Plate</Text>
            </Body>

            <Right>
              <Button 
                transparent
                onPress={() => logout(this.props.navigation)}>
                <AntDesign name='logout' style={{fontSize: 30, color: 'black'}} />
              </Button>
            </Right>
        </Header>
        <Content>
            <Text>ADD POST PHOTO SCREEN</Text>
            <Button 
            block success 
            onPress={() => this.props.navigation.navigate('AddPostComment')}>
                <Text>Submit Photo</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}