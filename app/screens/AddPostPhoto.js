import * as React from 'react';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Container, Header, Left, Right, Body, Content, Button, Text } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'; 

export default class AddPostPhoto extends React.Component {
  state = {
    image: null,
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
           <Text>Post a Plate</Text>
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

         <Button 
         block success 
         onPress={() => this.props.navigation.navigate('AddPostComment')}>
             <Text>Submit Photo</Text>
         </Button>
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  _takeImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    if (!cancelled) {
      this.setState({ image: uri });
    }
  };
}