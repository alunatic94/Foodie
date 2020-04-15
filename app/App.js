import React, { Component } from 'react';
import "../app/database/initFirebase.js"
import { StatusBar, YellowBox } from 'react-native';
import { Container, Text } from 'native-base';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/router.js';
import * as Font from 'expo-font';
import _ from 'lodash';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

/*Temp fix for yellow setting a timer warning */
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

/*Temp fix for font loading error */
Font.loadAsync({
  'Roboto': require('native-base/Fonts/Roboto.ttf'),
  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
});

/*App navigator for screen navigation */
const AppIndex = createAppContainer(AppNavigator);

export default class App extends Component {

  // Load custom fonts
  componentDidMount() {


    Font.loadAsync({
      'Nunito Sans': require('./assets/fonts/NunitoSans-Regular.ttf'),
      'Nunito Sans Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
      'Raleway': require('./assets/fonts/Raleway-Regular.ttf'),
      'Raleway Bold': require('./assets/fonts/Raleway-Bold.ttf'),
    });
  }
  render() {
    return (
      <Container style={{ flex: 5 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <AppIndex />
      </Container>
    )
  }
}
