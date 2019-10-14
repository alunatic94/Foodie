import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from './styles.js';
import serverHandler from '../handlers/ServerHandler.js';
import firebase from '../handlers/DBHandler.js';

class Register extends React.Component{
    constructor(props) {
         super(props)
 
         this.state = {
             firstName: '',
             lastName: '',
             age: 0,
             email: '',
             password: '',
             userId: ''
         }
   }

   registerWithEmail = (email, password) => {
     firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.state.userId = user.uid;
        console.log("User registered, new ID = " + user.uid);
      })
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
       <View style = {styles.left}>
         <View style = {styles.centered}>
           <Image source = {require('./assets/logo.png')} />
         </View>
         <View>
             <Text>Full Name:</Text>
             <View style={{flexDirection:"row" }}>
                 <View style={{flex: 1}}>
                     <TextInput placeholder="First" style={{ height: 50, borderColor: 'black', borderWidth: 2, justifyContent: 'flex-start'}} returnKeyLabel = {"next"} onChangeText={(text) => this.setState({firstName:text})}/>
                 </View>
                 <View style={{flex: 1}}>
                     <TextInput placeholder="Last" style={{ height: 50, borderColor: 'black', borderWidth: 2, justifyContent: 'flex-end'}}returnKeyLabel = {"next"} onChangeText={(text) => this.setState({lastName:text})} />
                 </View>
             </View>
         </View>
         <Text>  Age:</Text>
         <TextInput
         style = {{ height: 50, borderColor: 'black', borderWidth: 2}}
         returnKeyLabel = {"next"}
           onChangeText={(text) => this.setState({age:text})}
        />
         <Text>  Email:</Text>
         <TextInput
         style = {{ height: 50, borderColor: 'black', borderWidth: 2}}
         returnKeyLabel = {"next"}
           onChangeText={(text) => this.setState({email:text})}
        />
         <Text>  Password:</Text>
         <TextInput
         style = {{ height: 50, borderColor: 'black', borderWidth: 2}}
         returnKeyLabel = {"next"}
         onChangeText={(text) => this.setState({password:text})}
         />
         <Button
          title = 'Register Account'
          onPress = { () => {
              // Firebase Auth User creation
              this.registerWithEmail(this.state.email.trim(), this.state.password);

              // Then add user data (with ID) to database
              serverHandler.addNewUserData(this.state.userId, this.state.firstName.trim(), this.state.lastName.trim(),
                this.state.age.trim(), this.state.email.trim());

              this.navigateToLogin();
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
     )
   }
 }
 export default Register;