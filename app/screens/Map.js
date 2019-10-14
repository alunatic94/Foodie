import React from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Footer, FooterTab, Button, Text} from 'native-base';
import styles from './styles.js';
import Nav from '../navigation/Nav.js';

//Temporary testing button for returning to welcome screen
class Map extends React.Component{
    render(){
      return(        
          <Container>
            <Container style={styles.centered}>
            <Text> EMPTY MAPS SCREEN </Text>
          <Button
           title = 'Back to Welcome'
           onPress = {() => {
            this.props.navigation.dispatch(StackActions.reset({
              index:0,
              actions:[
                NavigationActions.navigate({ routeName: 'Welcome'})
              ]
            }))
          }} />
            </Container>        
              <Nav navigation={this.props.navigation}/>              
          </Container>        
      )
    }
  }
  export default Map; 