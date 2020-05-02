import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import ScreenHeader from '../components/common/ScreenHeader.js';
import { AquaMain } from '../styles/global';
export default class Help extends Component {

   render() {
      return (
         <Container>

            <ScreenHeader navigation={this.props.navigation} title="Help Menu" back />
            <Content contentContainerStyle={{ padding: 15 }}>

               <Button block
                  rounded style={{ backgroundColor: AquaMain, margin: 5 }}
                  onPress={() => this.props.navigation.navigate('HelpMap')}>
                  <Text>Map</Text>
               </Button>
               <Button block
                  rounded style={{ backgroundColor: AquaMain, margin: 5 }}
                  onPress={() => this.props.navigation.navigate('HelpProfile')}>
                  <Text>Profile</Text>
               </Button>
               <Button block
                  rounded style={{ backgroundColor: AquaMain, margin: 5 }}
                  onPress={() => this.props.navigation.navigate('HelpFeed')}>
                  <Text>Feed</Text>
               </Button>
               <Button block
                  rounded style={{ backgroundColor: AquaMain, margin: 5 }}
                  onPress={() => this.props.navigation.navigate('HelpPost')}>
                  <Text>Adding Posts</Text>
               </Button>
               <Button block
                  rounded style={{ backgroundColor: AquaMain, margin: 5 }}
                  onPress={() => this.props.navigation.navigate('HelpBadge')}>
                  <Text>Badges</Text>
               </Button>

            </Content>
         </Container>
      )
   }
}