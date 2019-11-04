import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from './styles.js';
import firebase from '../handlers/DBHandler.js';

class Login extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
        email: '',
        password: ''
    }
}

componentWillMount() {
  this.loginListener = firebase.auth().onAuthStateChanged(user => { 
    if (user) { // logged in
      this.navigateToFeed();
    } else { // not logged in (e.g. logged out)
      
    }
  })
}
loginWithEmail = (email, password) => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
          console.log("Logged in user: " + res.user.email);
    });
  };

  navigateToFeed = () => {
    this.props.navigation.dispatch(StackActions.reset({
      index:0,
      actions:[
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    }))
  }  

    render(){
     return (
      <View style={styles.left}>
        <View style = {styles.centered}>
          <Image source = {require('./assets/logo.png')} />
        </View>
  
        <Text>  Enter Username/Email:</Text>
        <TextInput
          style = {{ height: 50, borderColor: 'black', borderWidth: 2}}
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({email:text})}
        />
        <Text>  Enter Password:</Text> 
        <TextInput
          style = {{ height: 50, borderColor: 'black', borderWidth: 2}}
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({password:text})}
        />
        <Button
           title = 'Login'
           onPress = {() => {
            this.loginWithEmail(this.state.email, this.state.password);
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
  export default Login;
