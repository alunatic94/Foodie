import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { createAppContainer, StackActions, NavigationActions} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import styles from './styles.js';

//Temporary testing button for returning to welcome screen
class ProfileScreen extends React.Component{
    render(){
      return(
        <View style = {styles.centered}>
          <Text> EMPTY PROFILE SCREEN </Text>
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
        </View>
      )
    }
  }
  export default ProfileScreen;