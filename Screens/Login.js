import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions} from 'react-navigation';
import styles from './styles.js';
import {firebase} from '../database/Database.js';

class Login extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
        email: '',
        password: '',
        errormessage:''
    }
}

componentDidMount() {
  // this.loginListener = firebase.auth().onAuthStateChanged(user => { 
  //   if (user) { // logged in
  //     this.navigateToFeed();
  //   } else { // not logged in (e.g. logged out)
      
  //   }
  // })
}
loginWithEmail = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
          console.log("Logged in user: " + res.user.email);
          this.navigateToFeed();
    })
    .catch((error)=> {
      this.setState({errormessage:"Invalid password and/or email"})
      console.log(error.code);
      console.log(error.message);
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

      <KeyboardAvoidingView style={{flex: 1, alignItems: 'center'}} behavior="padding">
      <View style={styles.left}>
        <View style = {styles.centered}>
          <Image source = {require('./assets/logo.png')} />
        </View>
  
        <TextInput placeholder="  Email"
          style = {[styles.loginInput, {marginTop: 18}]}
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({email:text})}
        />

        <TextInput placeholder=" Password"
          style = {[styles.loginInput, {marginTop: 8}]}
          returnKeyLabel = {"next"}
          secureTextEntry
          onChangeText={(text) => this.setState({password:text})}
        />
         <Text style={{color:'red'}}>{this.state.errormessage}</Text>

        <TouchableOpacity
           onPress = {() => {
            this.loginWithEmail(this.state.email, this.state.password);
          }}>
            <View style = {[styles.loginButton, {marginTop: 2}]}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </View>
            </TouchableOpacity>
            <View style ={styles.signUpCont}>
            <Text>Don't have an account? </Text>   
        <TouchableOpacity
           onPress = {() => {
             this.props.navigation.dispatch(StackActions.reset({
               index:0,
               actions:[
                 NavigationActions.navigate({ routeName: 'Register'})
               ]
             }))
           }}>
             <View>
               <Text style={styles.signUpLink}>Sign up!</Text>
             </View>
           </TouchableOpacity>
           </View>
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
