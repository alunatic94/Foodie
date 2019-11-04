import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login.js';
import Register from '../screens/Register.js'; 
import Map from '../screens/Map.js';
import Feed from '../screens/Feed.js';
import Profile from '../screens/Profile.js';
import AddPostPhoto from '../screens/AddPostPhoto.js'; 
import AddPostComment from '../screens/AddPostComment.js'; 

const AppNavigator = createMaterialTopTabNavigator({
    Map: {
        screen: Map
    },
    Feed: {
        screen: Feed
    },
    Profile: {
        screen: Profile
    }
},{
    initialRouteName: 'Feed',
    tabBarPosition: 'bottom',
    tabBarOptions:{
        activeTintColor: 'orange',
        inactiveTintColor: 'grey',
        style: {
            backgroundColor: '#f2f2f2',
            borderTopWidth: 1,
            borderTopColor: 'grey',
            height: 70
        }
    }
});

const AppNavigator2 = createStackNavigator({
    
    Login:{
        screen: Login
    },
    Register:{
        screen: Register
    },
    AddPostPhoto: {
        screen: AddPostPhoto
    },
    AddPostComment: {
        screen: AddPostComment
    },
    Main: AppNavigator,
})

export default AppNavigator2; 

