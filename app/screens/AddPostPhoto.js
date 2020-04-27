import * as React from 'react';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Container, Header, Left, Right, Body, Content, Button, Text } from 'native-base';
import {firebase} from '../database/Database';
import uuid from 'uuid';
import ScreenHeader from '../components/common/ScreenHeader.js';
import {User} from '../database/User';

export default class AddPostPhoto extends React.Component {
  state = {
    image: null,
    uploading: false
  };

  render() {
    let { image } = this.state;

    return (
      <Container>
      
    <ScreenHeader navigation={this.props.navigation} title="Post a Plate" back />
     <Content>

         <Button block success onPress={this._pickImage}>
           <Text>Pick Photo</Text>
        </Button>
        <Button block success onPress={this._takeImage}>
           <Text>Take Photo</Text>
        </Button>
        
        {image &&
          <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />}

     </Content>
   </Container>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
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
      quality: 0,
    });

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
      quality: 0, 
    });
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
      this.props.navigation.navigate(
        'AddPostComment', 
        { uri : result.uri,
          imageURL: this.state.image  }
      );
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
    .child("images/" + User.getCurrentUserID() + "/" + uuid.v4());
  const snapshot = await ref.put(blob);
  blob.close();
  return await snapshot.ref.getDownloadURL();
}
