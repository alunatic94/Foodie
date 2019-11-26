import * as React from 'react';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Container, Header, Left, Right, Body, Content, Button, Text } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import styles from './styles.js';
import {firebase} from '../database/Database';
import uuid from 'uuid';

export default class AddPostPhoto extends React.Component {
  state = {
    image: null,
    uploading: false
  };

  render() {
    let { image } = this.state;

    return (
      <Container>
      <Header>
         <Left>
             <Button 
                  transparent
                  onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                  <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
             </Button>
         </Left>

         <Body>
           <Text style={styles.heading}>Post a Plate</Text>
         </Body>

         <Right>
           <Button 
             transparent
             onPress={() => logout(this.props.navigation)}>
             <AntDesign name='logout' style={{fontSize: 30, color: 'black'}} />
           </Button>
         </Right>
     </Header>
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

  _pickImage = async () => {
    const { navigate } = this.props.navigation;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    navigate(
      'AddPostComment', 
      { uri : result.uri }
    );

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this._handleImagePicked(result);
    }
  };
  _takeImage = async () => {
    const { navigate } = this.props.navigation;
    await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    navigate(
      'AddPostComment', 
      { uri : result.uri }
    );
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this._handleImagePicked(result);
    }
  };
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
  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }
}
}
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

  return await snapshot.ref.getDownloadURL();
}
