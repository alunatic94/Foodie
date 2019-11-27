import { TextInput, KeyboardAvoidingView, ActivityIndicator, ScrollView , Image} from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import React, { Component } from 'react';
import styles from './styles.js';
import {ProfileDB} from "../database/ProfileDB.js"
import {UserDB} from "../database/UserDB.js"
import {firebase, db} from '../database/Database';
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
            userID: this.props.navigation.getParam('userID', UserDB.getCurrentUserID()),
            currentProfile: null,
            isProfileLoaded: false,
            image: null,
            uploading: false,
            newFirst: '',
            newLast: '' ,
            newAge: '', 
            newAbout: ''
        }
    }
    componentDidMount() {
        this.getPermissionAsync();
        // Fetch profile data after component instance created
        (new ProfileDB(this.state.userID)).getProfile().then((profile) => {
            this.setState({currentProfile: profile, isProfileLoaded: true});
        });
    }
    render(){
        let { image } = this.state;

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
            
            <Body>
                <Text style={styles.heading}>
                     Picture:  
                </Text> 
                <Thumbnail large source={{uri: this.state.currentProfile.profileImage}} />
                <Button
                 rounded dark
                 onPress={this._pickImage}>
                     <Text>Upload Photo</Text>
                </Button>
                <Button
                 rounded dark
                 onPress={this._takeImage}>
                     <Text>Take Photo</Text>
                </Button>
                {image &&
                <Image source={{ uri: image }} style={{ width: 75, height: 75 }} />}
            </Body>
            <Button block success onPress={() => this.props.navigation.navigate('Main') 
                                                 && users.doc(this.state.userID).set({
                                                     first: this.state.newFirst,
                                                     last: this.state.newLast, 
                                                     age: this.state.newAge, 
                                                     about: this.state.newAbout,
                                                     //profileImage: uploadImageAsync({uri:image)
                                                 }, {merge: true})}>
                <Text>Save Changes</Text>
            </Button>
         </KeyboardAvoidingView>
        </Container>
       );
    }
      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    
      /*PICKING IMAGE FROM PHONE IMAGE LIBRARY */
      _pickImage = async () => {
        const { navigate } = this.props.navigation;
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(result);
        if (!result.cancelled) {
          this.setState({ image: result.uri });
          this._handleImagePicked(result);
        }
      };
    
    /*TAKE IMAGE FROM CAMERA */
      _takeImage = async () => {
        const { navigate } = this.props.navigation;
        await Permissions.askAsync(Permissions.CAMERA);
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(result);
        if (!result.cancelled) {
          this.setState({ image: result.uri });
          this._handleImagePicked(result);
        }
      };
    
      /* HANDLE IMAGE UPLOADED TO APP, SEND TO FIREBASE */
      _handleImagePicked = async result => {
        try {
          this.setState({ uploading: true });
    
          if (!result.cancelled) {
            uploadUrl = await uploadImageAsync(result.uri);
            this.setState({ image: uploadUrl });
          }
        } catch (e) {
          console.log(e);
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
      };
}
/* CONVERT TO BLOB FORMAT IN ORDER TO SEND TO FIREBASE */
async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
    blob.close();
  
    /* Displays in console the download URL of the image just uploaded onto firebase storage */
    console.log(await snapshot.ref.getDownloadURL());
  
    return await snapshot.ref.getDownloadURL();
  }