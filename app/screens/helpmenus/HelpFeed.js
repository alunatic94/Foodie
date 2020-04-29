import React, { Component } from 'react';
import { Pages } from 'react-native-pages';
import { Container } from 'native-base';
import ScreenHeader from '../../components/common/ScreenHeader.js'
import {Image} from 'react-native'
export default class HelpFeed extends Component {
  render() {
    return (
    <Container>
      <ScreenHeader navigation={this.props.navigation} title="Help Menu" back />
      <Pages horizontal = {false}
             indicatorColor='#6fdedc'>
        <Image style={{flex:1, height: undefined, width: undefined}}
               source={require('./assets/HelpFeed1.png')} 
               resizeMode="contain" />
        <Image style={{flex:1, height: undefined, width: undefined}}
               source={require('./assets/HelpFeed2.png')} 
               resizeMode="contain" />
        <Image style={{flex:1, height: undefined, width: undefined}}
               source={require('./assets/HelpFeed3.png')} 
               resizeMode="contain" />
        <Image style={{flex:1, height: undefined, width: undefined}}
               source={require('./assets/HelpFeed4.png')} 
               resizeMode="contain" />
      </Pages>
    </Container>
    );
  }
}