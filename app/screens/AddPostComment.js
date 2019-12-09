import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Right, Body, Content, Button, Text, Input, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js'; 
import styles from './styles.js';
export default class AddPostComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        likeButtonColor: '#a9a9a9',
        mehButtonColor: '#a9a9a9',
        dislikeButtonColor: '#a9a9a9',
        rating: 'meh',
        caption: ''
        // image will be passed
    };
  }

  componentWillMount() {
    const { like, meh, dislike } = this.props;
    this.setState({ like, meh, dislike });
}

onChangeLike = () => {  // Like button will be activated while meh and dislike button are disabled
  this.setState({
    likeButtonColor: 'green',
    mehButtonColor: '#a9a9a9',
    dislikeButtonColor: '#a9a9a9',
    rating: 'like'
  });   
} 

onChangeMeh = () => { // Meh button will be activated while like and dislike button are disabled
  this.setState({
    mehButtonColor: 'black',
    likeButtonColor: '#a9a9a9',
    dislikeButtonColor: '#a9a9a9',
    rating: 'meh'
  });
}

onChangeDislike = () => { // Dislike button will be activated while like and meh button are disabled
  this.setState({
   dislikeButtonColor: 'red',
   likeButtonColor: '#a9a9a9',
   mehButtonColor: '#a9a9a9',
   rating: 'dislike'
 });
}

submitButton = () => {
  // this.state.image, this.state.caption, this.state.rating 

}

  render() {
    const { navigation } = this.props;

    //IMAGE DISPLAY 
    const uri = navigation.getParam('uri');

    //IMAGE DOWNLOAD URL FROM FIREBASE 
    const imageURL = navigation.getParam('imageURL');  
    console.log(imageURL); 
    
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
         
            <Text style = {{fontSize:25, 
              fontWeight:"bold", 
              paddingTop: 18, 
              paddingBottom: 25}}>Rate your plate:</Text>
    
    <View style={{ borderWidth: 1, 
          height: 100, 
          alignItems: 'center', 
          justifyContent: 'center', 
          justifyContent:'space-between',
           paddingTop: 15, paddingBottom: 20 }}>
            <View style={{flexDirection: "row"}}>
              <Button 
                transparent> 
                  <AntDesign name={'like1'} color={this.state.likeButtonColor}
                    size={30} style={{padding: 30}} 
                    onPress={() => this.onChangeLike()}/>
             </Button>

              <Button 
               transparent> 
                  <AntDesign name={'meho'}  color={this.state.mehButtonColor}
                    size={30} style={{padding: 30}} 
                    onPress={() => this.onChangeMeh()}/>
             </Button>

             <Button 
               transparent> 
                  <AntDesign name={'dislike1'} color={this.state.dislikeButtonColor}
                  size={30} style={{padding: 30}} 
                  onPress={() => this.onChangeDislike()}/>
              </Button>
            </View>
          </View> 

            <Text style = {{fontSize:25,
               fontWeight:"bold", 
               paddingTop: 30,
                paddingBottom: 15}}>Add a caption:</Text>
          <View style={{borderWidth: 1}}>
            <Input placeholder="Caption" onChangeText={(text) => this.setState({caption:text})}/>
            </View>
            
            <Button
            block success 
            /*  onPress = { () => {
             this.submitButton();
            } }  */
            onPress={() => this.props.navigation.navigate('Main')}>
                <Text>Post your plate</Text>
            </Button>

        </Content>
      </Container>
    );
  }
}