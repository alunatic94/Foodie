import React, { Component } from 'react';
import {firebase} from '../database/Database';
import {Image, View} from 'react-native';
import styles from './styles.js';
export default class Loading extends Component {
    componentWillMount() {
        this.loginListener = firebase.auth().onAuthStateChanged(user => { 
            if (user) { // logged in
            this.props.navigation.navigate('Feed');
            } else { // not logge+d in (e.g. logged out)
            this.props.navigation.navigate('Login');
            }
        })
    }
    render() {
        return (
            <View style={styles.centered}>
                <Image source={{ uri: '../assets/logo.png' }} />
            </View>
        )
    }
}