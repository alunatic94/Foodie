import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Loading from '../screens/Loading.js';
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
import ProfileEdit from '../screens/ProfileEdit.js'
import ProfileOther from '../screens/ProfileOther.js'
import ProfileEditPhoto from '../screens/ProfileEditPhoto.js'
import Help from '../screens/Help.js';
import HelpBadge from '../screens/helpmenus/HelpBadge.js'
import HelpMap from '../screens/helpmenus/HelpMap.js'
import HelpPost from '../screens/helpmenus/HelpPost.js'
import HelpProfile from '../screens/helpmenus/HelpProfile.js'
import HelpFeed from '../screens/helpmenus/HelpFeed.js'
import { FontAwesome } from '@expo/vector-icons';
import { View } from 'native-base';
import { AquaMain } from '../styles/global.js'

const stackOptions = {
    headerMode: 'none'
};

// const AddPostStack = createStackNavigator({
//     AddPostPhoto: {
//         screen: AddPostPhoto
//     },
//     AddPostComment: {
//         screen: AddPostComment
//     },
//     Main: AddPostPhoto
// }, stackOptions)

const HelpStack = createStackNavigator({
    Help: {screen: Help},
    HelpBadge: {screen: HelpBadge},
    HelpMap: {screen: HelpMap},
    HelpPost: {screen: HelpPost},
    HelpProfile: {screen: HelpProfile},
    HelpFeed: {screen: HelpFeed},
    AddPostPhoto: {screen: AddPostPhoto},
    AddPostComment: {screen: AddPostComment},
    Main: Help
}, stackOptions)
 
const ProfileStack = createStackNavigator({
    Profile: { screen: Profile },
    ProfileEdit: { screen: ProfileEdit },
    ProfileEditPhoto: { screen: ProfileEditPhoto },
    Comments: {screen: Comments},
    LikePage: {screen: LikePage},
    // AddPost: AddPostStack,
    AddPostPhoto: {screen: AddPostPhoto},
    AddPostComment: {screen: AddPostComment},
    Help: HelpStack, 
    Main: Profile,
  }, stackOptions);
  
  const MapStack = createStackNavigator({
      Map: { screen: Map },
    //   AddPost: AddPostStack,
        AddPostPhoto: {screen: AddPostPhoto},
        AddPostComment: {screen: AddPostComment},
      Help: HelpStack, 
      Main: Map
  }, stackOptions);

  const FeedStack = createStackNavigator({
    Feed: { screen: Feed },
    Comments: { screen: Comments },
    LikePage: { screen: LikePage },
    // AddPost: AddPostStack,
    AddPostPhoto: {screen: AddPostPhoto},
    AddPostComment: {screen: AddPostComment},
    ProfileOther: {screen: ProfileOther},
    Help: HelpStack, 
    Main: Feed
  }, stackOptions);
  
const AppNavigatorTabs = createMaterialTopTabNavigator({
    MapTab: {
        screen: MapStack,
        navigationOptions:{
            tabBarLabel: <View/>,
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name ="map-marker" size={24} color={tintColor} />
            )
        }   
    },
    FeedTab: {
        screen: FeedStack,
        navigationOptions:{
            tabBarLabel: <View/>,
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name ="home" size={24} color={tintColor} />
            )
        }
    },

    ProfileTab: {
        screen: ProfileStack,
        navigationOptions:{
            tabBarLabel: <View/>,            
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name ="user" size={24} color={tintColor} />
            )
        }
    }
},{
    initialRouteName: 'FeedTab',
    tabBarPosition: 'bottom',
    tabBarOptions:{
        indicatorStyle: {
            opacity: 0
        },
        activeTintColor: AquaMain,
        inactiveTintColor: 'grey',
        showIcon: true, 
        style: {
            backgroundColor: '#f2f2f2',
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
            height: 'auto'
        }
    }
});


const AppNavigator = createStackNavigator({
    Loading: {
        screen: Loading
    },
    Login:{
        screen: Login
    },
    Register:{
        screen: Register
    },
    SearchRestaurants: {
        screen: SearchRestaurants
    },
    Main: AppNavigatorTabs,
},
{
    headerMode: 'none'
})

export default AppNavigator; 

