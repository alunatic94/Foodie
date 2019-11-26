import { TextInput, KeyboardAvoidingView, ActivityIndicator, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import React, { Component } from 'react';
import styles from './styles.js';
import {ProfileDB} from "../database/ProfileDB.js"
import {UserDB} from "../database/UserDB.js"
import {firebase, db} from '../database/Database';

users = db.collection('users');

export default class ProfileEdit extends Component{
    constructor(props) {
        super(props);
        // Defaults
        this.state = {
            userID: this.props.navigation.getParam('userID', UserDB.getCurrentUserID()),
            currentProfile: null,
            isProfileLoaded: false
        }
    }
    componentDidMount() {
        // Fetch profile data after component instance created
        (new ProfileDB(this.state.userID)).getProfile().then((profile) => {
            this.setState({currentProfile: profile, isProfileLoaded: true});
        });
    }
    render(){
        if (!this.state.isProfileLoaded) {
            return(
            <Content styles={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#ddd" />
            </Content>
            )
        }
        else return (
        <Container>
         <KeyboardAvoidingView style={{flex:1}} behavior="padding">
            <Left>
                <Text style={styles.heading}>
                    Your Profile 
                </Text>  
            </Left>
            <Text style={styles.heading}>
                 First Name:  
            </Text>  
            <Text style={styles.heading}>
                 Last Name:  
            </Text> 
            <Text style={styles.heading}>
                 Age:  
            </Text> 
            <Text style={styles.heading}>
                 Email:  
            </Text> 
            <Text style={styles.heading}>
                 Password:  
            </Text> 
            <Text style={styles.heading}>
                 About:  
            </Text> 
            <TextInput placeholder={this.state.currentProfile.about}
            style = {{ height: 40, borderColor: 'black', borderWidth: 2}}
            returnKeyLabel = {"next"}
            onChangeText={(text) => this.setState({text})}
            />
            
            <Left>
                <Text style={styles.heading}>
                     Picture:  
                </Text> 
                <Thumbnail large source={{uri: this.state.currentProfile.profileImage}} />
                <Button
                 rounded dark>
                     <Text>Upload Photo</Text>
                </Button>
            </Left>
            <Button block success onPress={() => this.props.navigation.navigate('Main') 
                                                 }>
                <Text>Save Changes</Text>
            </Button>
         </KeyboardAvoidingView>
        </Container>
       );
       }
}