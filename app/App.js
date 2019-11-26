import React, { Component } from 'react';
import {StatusBar, YellowBox} from 'react-native';
import { Container, Text } from 'native-base';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/router.js';
import * as Font from 'expo-font';

YellowBox.ignoreWarnings(['Setting a timer']);

Font.loadAsync({
  'Roboto': require('native-base/Fonts/Roboto.ttf'),
  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });

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
            <Container style={{flex: 5}}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <AppIndex />
            </Container>
        )
    }
}
