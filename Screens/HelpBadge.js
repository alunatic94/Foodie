import React, { Component } from 'react';
import { Pages } from 'react-native-pages';
import { Container } from 'native-base';
import {Image} from 'react-native'
import ScreenHeader from '../../components/common/ScreenHeader.js'
 
export default class HelpBadge extends Component {
  render() {
    return (
    <Container>
      <ScreenHeader navigation={this.props.navigation} title="Help Menu" back />
      <Pages horizontal = {false}
             indicatorColor='#6fdedc'>
        <Image style={{flex:1, height: undefined, width: undefined}}
               source={require('./assets/HelpBadge1.png')} 
               resizeMode="contain" />
        <Image style={{flex:1, height: undefined, width: undefined}}
               source={require('./assets/HelpBadge2.png')} 
               resizeMode="contain" />
      </Pages>
    </Container>
    );
  }
}