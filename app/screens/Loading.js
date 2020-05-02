import React, { Component } from 'react';
import {firebase, db} from '../database/Database';
import {Image, View} from 'react-native';
import { StackActions, NavigationActions} from 'react-navigation';
import { globalStyles } from '../styles/global.js';
import User from '../database/User';

export default class Loading extends Component {
    componentDidMount() {
        this.loginListener = firebase.auth().onAuthStateChanged(user => { 
            if (user) { // logged in
                this.props.navigation.navigate('Feed');
            } else { // not logged in (e.g. logged out)
            this.props.navigation.navigate('Login');
            }
        })
    }
    render() {
        return (
            <View style={globalStyles.centered}>
                <Image source={{ uri: '../styles/assets/loading.gif' }} />
            </View>
        )
    }
}