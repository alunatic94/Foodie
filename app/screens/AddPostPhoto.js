import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
export default class AddPostPhoto extends Component {
  render() {
    return (
      <Container>
        <Header />
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