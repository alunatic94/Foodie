import React from 'react';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './screens/Login.js';
import Register from './screens/Register.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import Map from './screens/Map.js';
import Profile from './screens/Profile.js';
import Feed from './screens/Feed.js';
//Screen navigator 
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  Welcome: {
    screen: WelcomeScreen
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