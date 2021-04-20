import React, { Component } from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { Container, Root, Text } from 'native-base';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/router.js';
import * as Font from 'expo-font';
import _ from 'lodash';
import {decode, encode} from 'base-64';
import {AppLoading} from 'expo';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

/*Temp fix for yellow setting a timer warning */
YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     _console.warn(message);
//   }
// };

/*App navigator for screen navigation */
const AppIndex = createAppContainer(AppNavigator);

export default class App extends Component {

  state = {
    fontsLoaded: false
  }

  // Load custom fonts
  async componentDidMount() {
    Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Raleway Bold': require('./assets/fonts/Raleway-Bold.ttf'),
      'Raleway': require('./assets/fonts/Raleway-Regular.ttf'),
      'Nunito Sans': require('./assets/fonts/NunitoSans-Regular.ttf'),
      'Nunito Sans Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
    });
    
  }
  render() {
    return (
      <Root>
        <Container style={{ flex: 5}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <AppIndex />
      </Container>
      </Root>
      
    )
  }
}
