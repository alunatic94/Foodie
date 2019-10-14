import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from './styles.js';
import Nav from '../navigation/Nav.js';
import { Container } from 'native-base';


//Temporary testing button for returning to welcome screen
class Profile extends React.Component{
    render(){
      return(
        <Container>
          <Text> EMPTY PROFILE SCREEN </Text>
          <Text> EMPTY PROFILE SCREEN </Text>
          <Text> EMPTY PROFILE SCREEN </Text>
          <Text> EMPTY PROFILE SCREEN </Text>
          <Text> EMPTY PROFILE SCREEN </Text>
          <Nav navigation={this.props.navigation}/>
          </Container>
      )
    }
  }
  export default Profile;