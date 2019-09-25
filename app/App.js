import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


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

class RegisterScreen extends React.Component{
   constructor(props) {
		super(props)

		this.state = {
			firstName: '',
			lastName: '',
			age: 0,
			email: ''
		}
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
        />
        <Button
         title = 'Register Account'
         onPress = {() => {
			 
		   fetch('http://192.168.1.205:3000/api/users', {  
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
			});

           this.props.navigation.dispatch(StackActions.reset({
             index:0,
             actions:[
               NavigationActions.navigate({ routeName: 'Login'})
             ]
           }))
         }} />
      </View>
    )
  }
}

class WelcomeScreen extends React.Component{
  render(){
    return(
      <View style = {styles.centered}>
        <Text> Welcome to Foodie! UNDER CONSTRUCTION!!! </Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  },
  Welcome: {
    screen: WelcomeScreen
  }
})

export default createAppContainer(AppNavigator); 

const styles = StyleSheet.create({
  centered: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  padded: {
	  padding: '5%'
  }
});
