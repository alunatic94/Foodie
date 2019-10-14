import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from './styles.js';
import Nav from '../navigation/Nav.js';


//Temporary testing button for returning to welcome screen
class Profile extends React.Component{
    render(){
      return(
        <View style = {styles.centered}>
          <Text> EMPTY PROFILE SCREEN </Text>          
          <Nav/>
        </View>
      )
    }
  }
  export default Profile;