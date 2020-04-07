import { TextInput, KeyboardAvoidingView, ActivityIndicator, ScrollView , Image} from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import React, { Component } from 'react';
import styles from './styles.js';
import {ProfileData} from "../database/ProfileData.js"
import {User} from "../database/User.js"
import {firebase, db} from '../database/Database';
import ScreenHeader from '../components/common/ScreenHeader.js';
import uuid from 'uuid';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

users = db.collection('users');

export default class ProfileEdit extends Component{
    constructor(props) {
        super(props);
        // Defaults
        this.state = {
            userID: this.props.navigation.getParam('userID', User.getCurrentUserID()),
            currentProfile: null,
            isProfileLoaded: false,
            newFirst: '',
            newLast: '',
            newAge: '',
            newAbout: ''
        }
    }
    componentDidMount() {
        // Fetch profile data after component instance created
        (new ProfileData(this.state.userID)).getProfile().then((profile) => {
            this.setState({currentProfile: profile,
                           isProfileLoaded: true});
        }).then(() => {this.setState({newFirst: this.state.currentProfile.first,
                                      newLast: this.state.currentProfile.last,
                                      newAge: this.state.currentProfile.age,
                                      newAbout: this.state.currentProfile.about})});
    }
    render(){
        if (!this.state.isProfileLoaded) {
            return(
            <Content styles={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#ddd" />
            </Content>
            )
        }
        else{ 
          return (
            <Container>
            <ScreenHeader navigation = {this.props.navigation} back />
            <KeyboardAvoidingView style={{flex:1}} behavior="padding">
            <Text style={styles.heading}>
                 First Name:  
            </Text>
            <TextInput placeholder={this.state.currentProfile.first}
            style = {{ height: 40, borderColor: 'black', borderWidth: 2}}
            returnKeyLabel = {"next"}
            onChangeText={(text) => this.setState({newFirst:text})}
            />  
            <Text style={styles.heading}>
                 Last Name:  
            </Text> 
            <TextInput placeholder={this.state.currentProfile.last}
            style = {{ height: 40, borderColor: 'black', borderWidth: 2}}
            returnKeyLabel = {"next"}
            onChangeText={(text) => this.setState({newLast:text})}
            />
            <Text style={styles.heading}>
                 Age:  
            </Text> 
            <TextInput placeholder={this.state.currentProfile.age}
            style = {{ height: 40, borderColor: 'black', borderWidth: 2}}
            returnKeyLabel = {"next"}
            onChangeText={(text) => this.setState({newAge:text})}
            />
            <Text style={styles.heading}>
                 About:  
            </Text> 
            <TextInput placeholder={this.state.currentProfile.about}
            style = {{ height: 40, borderColor: 'black', borderWidth: 2}}
            returnKeyLabel = {"next"}
            onChangeText={(text) => this.setState({newAbout:text})}
            />
            <Button block success onPress={() =>  users.doc(this.state.userID).set({
                                                     first: this.state.newFirst,
                                                     last: this.state.newLast, 
                                                     age: this.state.newAge, 
                                                     about: this.state.newAbout
                                                 }, {merge: true}) 
                                                    && this.props.navigation.goBack()
                                                   }>
                <Text>Save Changes</Text>
            </Button>
         </KeyboardAvoidingView>
        </Container>
       );
      }
    }
  }