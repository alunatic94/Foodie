import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import MapScreen from './screens/MapScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';

//Screen navigator 
const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  },
  Welcome: {
    screen: WelcomeScreen
  },
  Map: {
    screen: MapScreen
  },
  Profile: {
    screen: ProfileScreen
  }
})

export default createAppContainer(AppNavigator); 
