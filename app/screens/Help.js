import React, { Component } from 'react';
import { Container, Content, Segment, Button, Text, View, Tab, Tabs } from 'native-base';
import ScreenHeader from '../components/common/ScreenHeader.js';
export default class Help extends Component {

  render() {
    return (
        <Container>
      
        <ScreenHeader navigation={this.props.navigation} title="Help Menu" back />
         <Content>
    
             <Button block light>
               <Text>Map</Text>
            </Button>
            <Button block light>
               <Text>Profile</Text>
            </Button>
            <Button block light>
               <Text>Feed</Text>
            </Button>
            <Button block light>
               <Text>Adding Posts</Text>
            </Button>
            <Button block light>
               <Text>Badges</Text>
            </Button>
    
         </Content>
       </Container>
    )
  }
}