import React from 'react';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './screens/Login.js';
import Register from './screens/Register.js';
import Map from './screens/Map.js';
import Profile from './screens/Profile.js';
import Feed from './screens/Feed.js';
import * as Font from 'expo-font';

Font.loadAsync({
  'Roboto': require('native-base/Fonts/Roboto.ttf'),
  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });

//Screen navigator 
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  Map: {
    screen: Map
  },
  Profile: {
    screen: Profile
  },
  Feed: {
    screen: Feed
  }
})

export default createAppContainer(AppNavigator); 