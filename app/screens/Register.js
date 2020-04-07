import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions} from 'react-navigation';
import styles from './styles.js';
import {User} from '../database/User.js';
import {auth} from '../database/Database.js';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Register extends React.Component{
    constructor(props) {
         super(props)
 
         this.state = {
             username: '',
             first: '',
             last: '',
             age: 0,
             email: '',
             password: '',
             userId: ''
         }
   }

   registerUser = () => {
      // Firebase Auth User creation
      auth.createUserWithEmailAndPassword(this.state.email.trim(), this.state.password)
      .then((userCreds) => { // firebase returns UserCredentials object
        this.setState({userID: userCreds.user.uid});

        // Then add user data (with ID) to database
        let userData = User.createNew(userCreds.user.uid, this.state.username.trim(), this.state.first.trim(), this.state.last.trim(),
        this.state.age.trim(), this.state.email.trim());

        this.navigateToLogin();
      });
   }

   navigateToLogin = () => {
    this.props.navigation.dispatch(StackActions.reset({
      index:0,
      actions:[
        NavigationActions.navigate({ routeName: 'Login'})
      ]
    }))
   }
   render(){
     return(
     <KeyboardAvoidingView style={{flex:1}} behavior="padding">
       <View style = {styles.left}>
         <View style = {styles.centered}>
           <Image source = {require('./assets/logo.png')} />
         </View>
         <TextInput placeholder="Username"
         style = {{  height: 40, borderColor: 'black', borderWidth: 2}}
         returnKeyLabel = {"next"}
           onChangeText={(text) => this.setState({username:text})}
        />
         <View>
             <View style={{flexDirection:"row" }}>
                 <View style={{flex: 1}}>
                     <TextInput placeholder=" First" style={{ height: 40, borderColor: 'black', borderWidth: 2, justifyContent: 'flex-start'}} returnKeyLabel = {"next"} onChangeText={(text) => this.setState({first:text})}/>
                 </View>
                 <View style={{flex: 1}}>
                     <TextInput placeholder=" Last" style={{ height: 40, borderColor: 'black', borderWidth: 2, justifyContent: 'flex-end'}}returnKeyLabel = {"next"} onChangeText={(text) => this.setState({last:text})} />
                 </View>
             </View>
         </View>
         <TextInput placeholder=" Age"
         style = {{  height: 40, borderColor: 'black', borderWidth: 2}}
         returnKeyLabel = {"next"}
           onChangeText={(text) => this.setState({age:text})}
        />
         <TextInput placeholder=" Email"
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
          title = 'Register Account'
          onPress = { () => {
             this.registerUser();
            }
             
            
            /****
             * OLD REGISTER -> SERVER CODE
             * SEE: registerWithEmail() 
             
                   () => {
                            
            //  Connecting to the server will need to be updated
            // this code should call a function on server side
                  fetch('http://localhost:3000/api/users', {  
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      age: this.state.age,
                      email: this.state.email
                    })
                  }).catch((error) => console.log("Interesting"));
      
                  this.props.navigation.dispatch(StackActions.reset({
                    index:0,
                    actions:[
                      NavigationActions.navigate({ routeName: 'Login'})
                    ]
                  }))
                } 
            ****/
              } />
       </View>
       </KeyboardAvoidingView>
       
     )
   }
 }
 export default Register;