import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Map from '../screens/Map.js';
import Feed from '../screens/Feed.js';
import Profile from '../screens/Profile.js';

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

export default AppNavigator;