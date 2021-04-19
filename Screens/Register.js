import React from 'react';
import { StyleSheet, View, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text} from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions} from 'react-navigation';
import styles from './styles.js';
import {User} from '../database/User.js';
import {firebase} from '../database/Database.js';
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
             emailerror:'',
             usernameerror:'',
             password: '',
             passworderror:'',
             ageerror:'',
             userId: '',
             firstnameerror:'',
             lastnameerror:''
         }
   }

   registerUser = () => {
      // Firebase Auth User creation
      firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password)
      .then((userCreds) => { // firebase returns UserCredentials object
        this.setState({userID: userCreds.user.uid});

        // Then add user data (with ID) to database
        let userData = User.createNew(userCreds.user.uid, this.state.username.trim(), this.state.first.trim(), this.state.last.trim(),
        this.state.age.trim(), this.state.email.trim());

        this.navigateToLogin();
      })
      .catch((error)=> {
        if(this.state.password==""){
          this.setState({passworderror:"Password can not be left empty"})
        }
        else{
          this.setState({passworderror:""})
        }
        if(this.state.email==""){
          this.setState({emailerror:"Email can not be left empty."})
        }
        else{
         this.setState({emailerror:""})
        }
        if(this.state.username==""){
          this.setState({usernameerror:"You need a username!"})
        }
        else{
         this.setState({usernameerror:""})
        }
        if(this.state.first==""){
          this.setState({firstnameerror:"Whats your first name?"})
        }
        else{
          this.setState({firstnameerror:""})
        }
        if(this.state.last==""){
          this.setState({lastnameerror:"Whats your last name?"})
        }
        else{
          this.setState({lastnameerror:""})
        }
        if(this.state.age==""){
          this.setState({ageerror:"Whats your age?"})
        }
        else{
          this.setState({ageerror:""})
        }
        
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
   emailValidate(){
     if(this.state.email==""){
       this.setState({emailerror:"Email can not be left empty."})
     }
     else{
      this.setState({emailerror:""})
     }
   }
   passwordValidate(){
    var letters = /^[a-z]+$/;
    var numbers = /^[0-9]+$/;
    var specialchar = /^[!@#$%^&*()]+$/;
    var pass=this.state.password
     if(this.state.password==""){
       this.setState({passworderror:"Password can not be left empty"})
     }
     else{
       this.setState({passworderror:""})
     }

   }
   render(){
     return(
       <ScrollView>
         <KeyboardAvoidingView style={{flex: 1}} behavior="position">
       <View style = {styles.left}>
         <View style = {[styles.centered, {paddingTop: 30}]}>
           <Image source = {require('./assets/logo.png')} />
         </View>

         <TextInput placeholder="  Username"
         maxLength={10}
         style = {[styles.regInput, {marginTop: 16}]}
         returnKeyLabel = {"next"}
           onChangeText={(text) => this.setState({username:text})}
        />
        
        <View>
        <Text style={{color:'red'}}>{this.state.usernameerror}</Text>
        </View>
         <View style={{marginTop: 0}}>
             <View style={{flexDirection: "row"}}>
                 <View style={{flex: 1}}>
                     <TextInput placeholder="  First" 
                      keyboardType="ascii-capable" 
                      style={[styles.regInput, {marginRight: 0, justifyContent: 'flex-start'}]}
                      returnKeyLabel = {"next"}
                       onChangeText={(text) => this.setState({first:text})}/>
                       <View>
                       <Text style={{color:'red'}}>{this.state.firstnameerror}</Text>
                       </View>  
                 </View>
                 
                 <View style={{flex: 1}}>
                     <TextInput placeholder="  Last"
                      style={[styles.regInput, {marginLeft: 0, justifyContent: 'flex-end'}]}
                      returnKeyLabel = {"next"}
                       onChangeText={(text) => this.setState({last:text})}/>
                       <View>
                       <Text style={{color:'red'}}>{this.state.lastnameerror}</Text> 
                       </View>       
                 </View>
             </View>
         </View>

         <TextInput placeholder="  Age"
         style = {styles.regInput}
         returnKeyLabel = {"next"}
         keyboardType="numeric"
         maxLength={2}
           onChangeText={(text) => this.setState({age:text})}/>
           <View>
           <Text style={{color:'red'}}>{this.state.ageerror}</Text>
           </View>

         <TextInput placeholder="  Email"
          keyboardType="email-address"
          onBlur={()=> this.emailValidate()}
          style = {[styles.regInput, {paddingTop: 0}]}
          returnKeyLabel = {"next"}
           onChangeText={(text) => this.setState({email:text})}
        />
        <View>
        <Text style={{color:'red'}}>{this.state.emailerror}</Text>
        </View>

         <TextInput placeholder="  Password"
         style = {styles.regInput}
         onBlur={() => this.passwordValidate()}
         returnKeyLabel = {"next"}
         secureTextEntry
         onChangeText={(text) => this.setState({password:text})}
         /><View>
         <Text style={{color:'red'}}>{this.state.passworderror}</Text>
         </View>

         <TouchableOpacity
          onPress = { () => {this.registerUser();}}>
            <View style = {[styles.regButton, {marginTop: 0}]}>
              <Text style={styles.regButtonText}>Sign Up</Text>
            </View>
            </TouchableOpacity>

            <View style ={styles.signInCont}>
            <Text>Already have an account? </Text>   
        <TouchableOpacity
           onPress = {() => {
             this.props.navigation.dispatch(StackActions.reset({
               index:0,
               actions:[
                 NavigationActions.navigate({ routeName: 'Login'})
               ]
             }))
           }}>
             <View>
               <Text style={[styles.signInLink, {marginTop: 0}]}>Sign in!</Text>
             </View>
           </TouchableOpacity>
           </View>
       
            
          {/*   /****
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
            ****/}
            
       </View>
       </KeyboardAvoidingView> 
       </ScrollView>
     )
   }
 }
 export default Register;