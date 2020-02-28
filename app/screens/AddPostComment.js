import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Right, Body, Content, Button, Text, Input, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { logout } from '../screens/Login.js';
import styles from './styles.js';
import { db } from '../database/Database.js';
import { User } from '../database/User.js';

export default class AddPostComment extends Component {

  time = new Date();

  posts = db.collection("posts");
  users = db.collection("users");
  photos = [this.props.navigation.getParam('imageURL')];

  constructor(props) {
    super(props);
    this.state = {
      likeButtonColor: '#a9a9a9',
      mehButtonColor: '#a9a9a9',
      dislikeButtonColor: '#a9a9a9',
      rating: 'meh',
      latitude: 0,
      longitude: 0,
      caption: '',
      isLoading: true,
      isLoaded: false,
      user: null,
      error: null,
      userID: '',
      like: false,
      meh: false,
      dislike: false,
      searchedRestaurantName: 'Search restaurants',
      searchedRestaurantID: ''
    };
  }

  async componentDidMount() {
    const { like, meh, dislike } = this.props;
    this.setState({ like, meh, dislike });
    this.getUser();
  }

  getUser = () => {
    User.getCurrent().then(user => {
      this.setState({user, isLoading: false});
    });
  }

  addPost() {
    let postData = {
      images: this.photos,
      likes: 0,
      rating: this.state.rating,
      caption: this.state.caption,
      yelpID: this.state.searchedRestaurantID,
      userID: User.getCurrentUserID(),
      timestamp: new Date()
      // TODO:
      // this.state.user.userID
      // user.getCurrentID()      
      // likes_who
      // caption
    }
    this.posts.add(postData)
    .then((doc) => {
      this.posts.doc(doc.id).update({id: doc.id}); // Add auto-generated ID to existing doc
      
      // Add reference to new post ID in user doc
      plates = this.state.user.plates;
      plates.push(doc.id);
      users.doc(User.getCurrentUserID()).update({plates: plates});
    })
    this.props.navigation.navigate('Main');
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

  refresh = (data) => {
    this.setState({
      searchedRestaurantName: data.name,
      searchedRestaurantID: data.id,
    })
  }

  refreshLoc = (data) => {
    this.setState({
      latitude: data.latitude,
      longitude: data.longitude
    })
  }

  render() {
    const { navigation } = this.props;
    const { search } = this.state;

    //IMAGE DISPLAY 
    const uri = navigation.getParam('uri');

    //IMAGE DOWNLOAD URL FROM FIREBASE 
    const imageURL = navigation.getParam('imageURL');

    return this.state.isLoading
      ? <Text style={{ marginTop: 50 }}>TODO: Screen is loading!</Text>
      : (<Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('AddPostPhoto')}>
              <AntDesign name='pluscircle' style={{ fontSize: 30, color: 'black' }} />
            </Button>
          </Left>

          <Body>
            <Text style={styles.heading}>Post a Plate</Text>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => logout(this.props.navigation)}>
              <AntDesign name='logout' style={{ fontSize: 30, color: 'black' }} />
            </Button>
          </Right>
        </Header>

        <Content>

          <Text style={{
            fontSize: 25,
            fontWeight: "bold",
            paddingTop: 18,
            paddingBottom: 25
          }}>Rate your plate:</Text>

          <View style={{
            borderWidth: 1,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            justifyContent: 'space-between',
            paddingTop: 15, paddingBottom: 20
          }}>
            <View style={{ flexDirection: "row" }}>
              <Button
                transparent>
                <AntDesign name={'like1'} color={this.state.likeButtonColor}
                  size={30} style={{ padding: 30 }}
                  onPress={() => this.onChangeLike()} />
              </Button>

              <Button
                transparent>
                <AntDesign name={'meho'} color={this.state.mehButtonColor}
                  size={30} style={{ padding: 30 }}
                  onPress={() => this.onChangeMeh()} />
              </Button>

              <Button
                transparent>
                <AntDesign name={'dislike1'} color={this.state.dislikeButtonColor}
                  size={30} style={{ padding: 30 }}
                  onPress={() => this.onChangeDislike()} />
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

          <Text style={{
            fontSize: 25,
            fontWeight: "  bold",
            paddingTop: 30,
            paddingBottom: 15
          }}>Add a caption:</Text>
          <View style={{ borderWidth: 1 }}>
            <Input placeholder="Caption" onChangeText={(text) => this.setState({ caption: text })} />
          </View>

          <Text style={{
            fontSize: 25,
            fontWeight: "bold",
            paddingTop: 30,
            paddingBottom: 15
          }}>Add location:</Text>

          <Button
            block
            onPress={() => this.props.navigation.navigate('SearchRestaurants',
              {
                lat: this.state.latitude,
                long: this.state.longitude,
                onGoBack: this.refresh,
                location: this.refreshLoc
              }
            )}>
            <Text>{this.state.searchedRestaurantName}</Text>
          </Button>

          <Button
            block success
            /*  onPress = { () => {
             this.submitButton();
            } }  */
            onPress={() => {
              this.props.navigation.navigate('Main');
              this.addPost();
            }}>
            <Text>Post your plate</Text>
          </Button>

        </Content>
      </Container>
      );
  }
}