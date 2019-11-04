import React from 'react';
import MapView from "react-native-maps";
import { StyleSheet, View, Image, TextInput, Dimensions } from 'react-native';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Footer, FooterTab, Button, Text} from 'native-base';
import styles from './styles.js';
import MainHeader from './Header.js';

class Map extends React.Component{
    render(){
      return(        
          <Container>
            <MainHeader>
            </MainHeader>
            <MapView
              style={{flex: 5}}
              initialRegion={{
                // 37.78825, -122.4324
                latitude: 34.241089,
                longitude: -118.527509,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
        />       
          </Container>        
      )
    }
  }
  export default Map; 