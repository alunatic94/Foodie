import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
export default class AddPostComment extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
         
            <Text>ADD POST COMMENT/RATING SCREEN</Text>
            <Button 
            block success 
            onPress={() => this.props.navigation.navigate('Main')}>
                <Text>Post your plate</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}