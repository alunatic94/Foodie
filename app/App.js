import React, { Component } from 'react';
import styles from './screens/styles.js';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigation/router.js'

const AppIndex = createAppContainer(AppNavigator);

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