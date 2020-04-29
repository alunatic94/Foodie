import React, { Component } from 'react';
import { Container, Content, Button, Text} from 'native-base';
import ScreenHeader from '../components/common/ScreenHeader.js';
export default class Help extends Component {

  render() {
    return (
        <Container>
      
        <ScreenHeader navigation={this.props.navigation} title="Help Menu" back />
         <Content>
    
             <Button block light
                onPress={() => this.props.navigation.navigate('HelpMap')}>
               <Text>Map</Text>
            </Button>
            <Button block light
                onPress={() => this.props.navigation.navigate('HelpProfile')}>
               <Text>Profile</Text>
            </Button>
            <Button block light
                onPress={() => this.props.navigation.navigate('HelpFeed')}>
               <Text>Feed</Text>
            </Button>
            <Button block light
                onPress={() => this.props.navigation.navigate('HelpPost')}>
               <Text>Adding Posts</Text>
            </Button>
            <Button block light
                onPress={() => this.props.navigation.navigate('HelpBadge')}>
               <Text>Badges</Text>
            </Button>
    
         </Content>
       </Container>
    )
  }
}