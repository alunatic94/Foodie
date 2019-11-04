import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Map from '../screens/Map.js';
import Feed from '../screens/Feed.js';
import Profile from '../screens/Profile.js';
import { FontAwesome } from '@expo/vector-icons';


const AppNavigator = createMaterialTopTabNavigator({
    Map: {
        screen: Map,
        navigationOptions:{
            tabBarLabel: 'Map',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name ="map-marker" size={24} color="grey" />
            )
        }   
    },
    Feed: {
        screen: Feed,
        navigationOptions:{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name ="home" size={24} color="grey" />
            )
        }
    },

    Profile: {
        screen: Profile,
        navigationOptions:{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name ="user" size={24} color="grey" />
            )
        }
    }
},{
    tabBarPosition: 'bottom',
    tabBarOptions:{
        activeTintColor: 'orange',
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

export default AppNavigator;