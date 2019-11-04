import React, { Component } from 'react';
import styles from './screens/styles.js';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { createAppContainer } from 'react-navigation';
import AppNavigator2 from './navigation/router.js';
import * as Font from 'expo-font';

Font.loadAsync({
  'Roboto': require('native-base/Fonts/Roboto.ttf'),
  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });

const AppIndex = createAppContainer(AppNavigator2);

export default class App extends Component {
    render() {
        return (
            <Container style={{flex: 1}}>
                <Text>  </Text>
                <Text>  </Text>
                <AppIndex />
            </Container>
        )
    }
}