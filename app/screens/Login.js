import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions} from 'react-navigation';
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
      <KeyboardAvoidingView style={{flex:1}} behavior="padding">
      <View style={styles.left}>
        <View style = {styles.centered}>
          <Image source = {require('./assets/logo.png')} />
        </View>
  
        <TextInput placeholder=" Username/Email"
          style = {{ height: 40, borderColor: 'black', borderWidth: 2}}
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({email:text})}
        />
        <TextInput placeholder=" Password"
          style = {{ height: 40, borderColor: 'black', borderWidth: 2}}
          returnKeyLabel = {"next"}
          secureTextEntry
          onChangeText={(text) => this.setState({password:text})}
        />
        <Button
           title = 'Log In'
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
    </KeyboardAvoidingView>
    );
    }
  }
 export const logout = (navigation) => {
    firebase.auth()
      .signOut()
      .then(function() {
        navigation.navigate('Login');
      })
      .catch(function(error) {
        console.log("Could not log out user");
      });
  }
export default Login;
