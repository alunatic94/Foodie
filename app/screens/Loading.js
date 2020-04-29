import React, { Component } from 'react';
import {firebase} from '../database/Database';
import {Image, View} from 'react-native';
import { StackActions, NavigationActions} from 'react-navigation';
import { globalStyles } from '../styles/global.js';
export default class Loading extends Component {
    componentWillMount() {
        this.loginListener = firebase.auth().onAuthStateChanged(user => { 
            if (user) { // logged in
                this.props.navigation.dispatch(StackActions.reset({
                    index:0,
                    actions:[
                      NavigationActions.navigate({ routeName: 'Main'})
                    ]
                }))
            } else { // not logge+d in (e.g. logged out)
            this.props.navigation.navigate('Login');
            }
        })
    }
    render() {
        return (
            <View style={globalStyles.centered}>
                <Image source={{ uri: '../assets/logo.png' }} />
            </View>
        )
    }
}