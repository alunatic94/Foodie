import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login.js';
import Register from '../screens/Register.js'; 
import Map from '../screens/Map.js';
import Feed from '../screens/Feed.js';
import Profile from '../screens/Profile.js';
import AddPostPhoto from '../screens/AddPostPhoto.js'; 
import AddPostComment from '../screens/AddPostComment.js';
import SearchRestaurants from "../screens/SearchRestaurants.js"
import Comments from '../screens/Comments.js'
import LikePage from '../screens/LikePage.js';
import LikeButton from '../components/LikeButton.js';
import ProfileEdit from '../screens/ProfileEdit.js'
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'native-base';

const AppNavigatorTabs = createMaterialTopTabNavigator({
    Map: {
        screen: Map,
        navigationOptions:{
            tabBarLabel: <View/>,
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name ="map-marker" size={24} color={tintColor} />
            )
        }   
    },
    Feed: {
        screen: Feed,
        navigationOptions:{
            tabBarLabel: <View/>,
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name ="home" size={24} color={tintColor} />
            )
        }
    },

    Profile: {
        screen: Profile,
        navigationOptions:{
            tabBarLabel: <View/>,            
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name ="user" size={24} color={tintColor} />
            )
        }
    }
},{
    initialRouteName: 'Feed',
    tabBarPosition: 'bottom',
    tabBarOptions:{
        indicatorStyle: {
            opacity: 0
        },
        activeTintColor: '#6fdedc',
        inactiveTintColor: 'grey',
        showIcon: true, 
        style: {
            backgroundColor: '#f2f2f2',
            borderTopWidth: 1,
            borderTopColor: 'grey',
            height: 70
        }
    }
});

const AppNavigator = createStackNavigator({
    

    Login:{
        screen: Login
    },
    Register:{
        screen: Register
    },
    Feed: {
        screen: Feed
    },
    Profile: {
        screen: Profile
    },
    SearchRestaurants: {
        screen: SearchRestaurants
    },
    AddPostPhoto: {
        screen: AddPostPhoto
    },
    AddPostComment: {
        screen: AddPostComment
    },
    Comments: {
        screen: Comments
    },
    ProfileEdit: {
        screen: ProfileEdit
    },
    Map: {
        screen: Map
    },
    LikePage: {
        screen: LikePage
    },
    Main: AppNavigatorTabs,
},
{
    headerMode: 'none'
})

export default AppNavigator; 

