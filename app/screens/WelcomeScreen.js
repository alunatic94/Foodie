import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from './styles.js';
import firebase from '../handlers/DBHandler.js';

class WelcomeScreen extends React.Component{
    render(){
      return(
        <View style = {styles.centered}>
          <Image source = {require('./assets/logo.png')} />
          <Text> Where would you like to begin? </Text>
          <Button
           title = 'Map'
           onPress = {() => {
            this.props.navigation.dispatch(StackActions.reset({
              index:0,
              actions:[
                NavigationActions.navigate({ routeName: 'Map'})
              ]
            }))
          }} />
          <Button
           title = 'Profile'
           onPress = {() => {
            this.props.navigation.dispatch(StackActions.reset({
              index:0,
              actions:[
                NavigationActions.navigate({ routeName: 'Profile'})
              ]
            }))
          }} />
          <Button
           title = 'Logout'
           onPress = {() => {
            firebase.auth().signOut();
            this.props.navigation.dispatch(StackActions.reset({
              index:0,
              actions:[
                NavigationActions.navigate({ routeName: 'Login'})
              ]
            }))
          }} />
        </View>
      )
    }
  }
  export default WelcomeScreen; 