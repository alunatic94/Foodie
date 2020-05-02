import React, { Component } from 'react';
import { Container,Content, Button, Text, Input, View, Toast } from 'native-base';
import { Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, firebase } from '../database/Database';
import { User } from '../database/User.js';
import ScreenHeader from '../components/common/ScreenHeader.js';
import axios from 'axios';
import { REACT_APP_MAP_AUTH } from 'react-native-dotenv';
import geohash from 'ngeohash';
import { globalStyles, badgeColors, AquaMain, AquaSecondary } from '../styles/global.js';

export default class AddPostComment extends Component {

  time = new Date();

  posts = db.collection("posts");
  users = db.collection("users");
  rest = db.collection("restaurants")
  photos = [this.props.navigation.getParam('imageURL')];

  addPostHeaderStyle = [globalStyles.headingLarge, {marginBottom: 10, marginTop: 15}];

  constructor(props) {
    super(props);
    this.state = {
      likeButtonColor: '#a9a9a9',
      mehButtonColor: '#a9a9a9',
      dislikeButtonColor: '#a9a9a9',
      veganButtonColor:'#a9a9a9',
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
      isvegan:false,
      searchedRestaurantName: 'Search restaurants',
      searchedRestaurantID: '',
      searchedRestaurantCoordinates: [],
      isPostButtonDisabled: true
    };
  }

  async componentDidMount() {
    const { like, meh, dislike } = this.props;
    this.setState({ like, meh, dislike });
    this.getUser();
  }

  getUser = () => {
    User.getCurrent().then(user => {
      this.setState({ user, isLoading: false });
    });
  }

  addSend(latlong, hash) {
    let postData = {
      images: this.photos,
      likes: 0,
      rating: this.state.rating,
      caption: this.state.caption,
      yelpID: this.state.searchedRestaurantID,
      userID: User.getCurrentUserID(),
      timestamp: new Date(),
      latitude: latlong.latitude,
      longitude: latlong.longitude,
      geohash: hash
    }
    this.posts.add(postData)
      .then((doc) => {
        this.posts.doc(doc.id).update({ id: doc.id }); // Add auto-generated ID to existing doc

        // Add reference to new post ID in user doc
        plates = this.state.user.plates;
        plates.push(doc.id);

        users.doc(User.getCurrentUserID()).update({ plates: plates });

        // Add post ID to restaurant collection
        this.addRestaurantPlate(doc.id);

        // Add badge (if necessary) to user doc
        // this.addBadge();

        this.props.navigation.navigate('Main');
      })
  }

  addPost() {
    axios.get('https://api.yelp.com/v3/businesses/' + this.state.searchedRestaurantID, {
      headers: { 'Authorization': REACT_APP_MAP_AUTH }
    }).then((res) => {
      let { latitude, longitude } = res.data.coordinates
      let hash = geohash.encode(latitude, longitude)
      this.addSend(res.data.coordinates, hash)
    }).catch((err) => {
      console.log("Yelp request via Axios failed: " + err);
      console.log("error at getlatlong")
      return err;
    })
  }

  addRestaurantPlate(x) {
    this.rest.doc(this.state.searchedRestaurantID).get().then((doc) => {
      currentPlates = doc.data().plate_posts;
      currentPlates.push(x); // Add post to end of array
      this.rest.doc(this.state.searchedRestaurantID).update({ // Insert into database array
        plate_posts: currentPlates
      });
    }).catch((err) => { // Error because restaurant does not exist
      this.rest.doc(this.state.searchedRestaurantID).set({  // Create array with the restaurant ID as document name
        restaurant_name: this.state.searchedRestaurantName,
        plate_posts: []
      }) // Initalize with restaurant name and empty array
      this.addRestaurantPlate(x); // Call again to add plate to newly created document
    })
  }

  async addBadge() {
    var badgeID = "";
    var numPlates; 
    await this.users.doc(User.getCurrentUserID()).get().then((doc)=>{
      if(doc.exists){
        numPlates = doc.data().postCount;
      }
    })
    switch(numPlates){
      case 1: 
        badgeID = "first-plate"; 
        break;
      case 10: 
        badgeID = "ten-plates"; 
        break; 
      case 20: 
        badgeID = "twenty-plates";
        break; 
      case 100: 
        badgeID = "hundred-plates"; 
        break; 
      default: 
        badgeID = null; 
    }
    if (badgeID != null) {
      badges = null; 
      await this.users.doc(User.getCurrentUserID()).get().then((doc)=>{
        if(doc.exists){
          badges = doc.data().badges;
        }
      })
      badges.push(badgeID);
      
      let badgeColor = (badgeColors[badgeColor] ? badgeColors[badgeColor] : AquaMain);
      users.doc(User.getCurrentUserID()).update({ badges: badges });
      Toast.show({
        text: `You earned a badge for posting ${numPlates} plates. Rock on!`,
        buttonText: 'Woo!',
        type: 'success',
        duration: 3000,
        style: {opacity: .95, backgroundColor: badgeColor},
        buttonTextStyle: {color: 'dimgray'}
      })
    }
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

  onChangeVegan = () => { 
    if(!this.state.isvegan)
    {
      this.setState({
        dislikeButtonColor:'#a9a9a9',
        likeButtonColor: '#a9a9a9',
        mehButtonColor: '#a9a9a9',
        veganButtonColor:'green',
        isvegan:true
      });
    }
    else{
      this.setState({
        dislikeButtonColor:'#a9a9a9',
        likeButtonColor: '#a9a9a9',
        mehButtonColor: '#a9a9a9',
        veganButtonColor:'#a9a9a9',
        isvegan:false
      });
    }
  }

  submitButton = () => {
    // this.state.image, this.state.caption, this.state.rating 

  }

  refresh = (data) => {
    this.setState({
      searchedRestaurantName: data.name,
      searchedRestaurantID: data.id,
      isPostButtonDisabled: false
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
      ? <Container style={{flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center'}}><Image source={require('../styles/assets/loading.gif')}/></Container>
      : (<Container>
        <ScreenHeader navigation={this.props.navigation} title="Post a Plate" back />

        <Content style={{paddingTop: 0, paddingRight: 15, paddingLeft: 15, paddingBottom: 30}}>

          <Text style={this.addPostHeaderStyle}>Rate your plate:</Text>

          <View style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: "row"
          }}>
              
              <Button
                transparent>
                <AntDesign name={'dislike1'} color={this.state.dislikeButtonColor}
                  size={30} style={{ padding: 30 }}
                  onPress={() => this.onChangeDislike()} />
              </Button>

              <Button
                transparent>
                <AntDesign name={'meho'} color={this.state.mehButtonColor}
                  size={30} style={{ padding: 30 }}
                  onPress={() => this.onChangeMeh()} />
              </Button>

              <Button
                transparent>
                <AntDesign name={'like1'} color={this.state.likeButtonColor}
                  size={30} style={{ padding: 30 }}
                  onPress={() => this.onChangeLike()} />
              </Button>

          </View>
          <Text style={this.addPostHeaderStyle}>Category:</Text>

          <View style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
            
              <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    transparent>
                    <AntDesign name={'downcircle'} color={this.state.veganButtonColor}
                      size={30} style={{height:35,width:35, marginBottom: 5}}
                      onPress={() => this.onChangeVegan()} />
                  </Button>
                  <Text style={globalStyles.lightText}>Vegan</Text>
              </View>
          </View>

          <Text style={this.addPostHeaderStyle}>Add a caption:</Text>
          <View style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 10, height: 100 }}>
            <Input multiline={true} textAlignVertical="top" numberOfLines={10} placeholder="Let the world know your cravings!" onChangeText={(text) => this.setState({ caption: text })} />
          </View>

          <Text style={this.addPostHeaderStyle}>Location:</Text>

          <Button
            block
            rounded style={{ backgroundColor: AquaSecondary, margin: 5 }}
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
            block
            disabled={this.state.isPostButtonDisabled}
            rounded style={
              this.state.isPostButtonDisabled ? {backgroundColor: 'lightgray', margin: 5} :
              { backgroundColor: AquaMain, margin: 5 }
            }
            onPress={() => {
              this.addPost();
              const increment = firebase.firestore.FieldValue.increment(1);
              this.users.doc(User.getCurrentUserID()).update({postCount: increment})
              this.addBadge(); 
              this.props.navigation.navigate('FeedTab');
            }}>
            <Text>Post your plate</Text>
          </Button>

        </Content>
      </Container>
      );
  }
}