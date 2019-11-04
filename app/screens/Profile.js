import React, { Component } from 'react';
import { Container } from 'native-base';
import styles from './styles.js';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import MainHeader from './Header.js';


export default class Profile extends Component {
    render() {
        return (
            <Container>
                <MainHeader>
                </MainHeader>
                <Text> EMPTY PROFILE SCREEN</Text>
            </Container>
        )
    }
}