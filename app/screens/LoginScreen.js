import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from './styles.js';

class LoginScreen extends React.Component{
    render(){
     return (
      <View style={styles.left}>
        <View style = {styles.centered}>
          <Image source = {require('./assets/logo.png')} />
        </View>
  
        <Text>  Enter Username/Email:</Text>
        <TextInput
          style = {{ height: 50, borderColor: 'black', borderWidth: 2}}
        />
        <Text>  Enter Password:</Text> 
        <TextInput
          style = {{ height: 50, borderColor: 'black', borderWidth: 2}}
        />
        <Button
           title = 'Login'
           onPress = {() => {
            this.props.navigation.dispatch(StackActions.reset({
              index:0,
              actions:[
                NavigationActions.navigate({ routeName: 'Welcome'})
              ]
            }))
          }} />
        <Button
           title = 'First Time? Create an Account!'
           onPress = {() => {
             this.props.navigation.dispatch(StackActions.reset({
               index:0,
               actions:[
                 NavigationActions.navigate({ routeName: 'Register'})
               ]
             }))
           }} />
      </View>
    );
    }
  }
  export default LoginScreen;
