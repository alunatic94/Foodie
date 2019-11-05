import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/router.js';
import * as Font from 'expo-font';

Font.loadAsync({
  'Roboto': require('native-base/Fonts/Roboto.ttf'),
  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });

const AppIndex = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return (
            <Container style={{flex: 5}}>
                <AppIndex />
            </Container>
        )
    }
}
