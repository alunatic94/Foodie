import MapView, { Marker } from "react-native-maps";
import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Dimensions } from 'react-native';
import ScreenHeader from '../components/common/ScreenHeader.js';
import MapPopUp  from '../components/MapPopUp'; 
import { Container } from 'native-base';
import { FontAwesome, Feather } from 'react-native-vector-icons';
import Modal from 'react-native-modal';
import { Linking, Platform } from 'react-native';
import { REACT_APP_MAP_AUTH } from 'react-native-dotenv';
import { Slider, Text } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121,
      error: null,
      nearbyRestaurants: [],
      searchedRestaurantID: '',
      isLoaded: false,
      zoomLevel: 16,
      showPopUp: false,
      restaurantName: "",
      restaurantPhone: "",
      restaurantRating: 0,
      xCord: "",
      yCord: "",
      SliderDist: 0,
      minSliderDist: 0,
      maxSliderDist: 15
    };
    
      // Bind to Profile context so calls pop-up for plates tapped
      this.togglePopUp = this.togglePopUp.bind(this);
  }
  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          origLat: position.coords.latitude,
          origLong: position.coords.longitude,
          error: null
        }, this.updateRestaurants);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 2000 }
    );
  }

  onRegionChangeComplete = (region) => {
    this.setState({
      // latitude: region.latitude,
      // longitude: region.longitude,
      // latitudeDelta: region.latitudeDelta,
      // longitudeDelta: region.longitudeDelta,
      zoomLevel: this.getZoomLevel(region)
    });
  }

  getZoomLevel = (region) => {
    return Math.log2(360 * ((screenWidth / 256) / region.longitudeDelta)) + 1;
  }

  refresh = (data) => {
    this.setState({
      searchedRestaurantID: data
    })
  }

  updateRestaurants = () => {
    axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: { 'Authorization': REACT_APP_MAP_AUTH },
      params: {
        // // latitude: 34.2383,
        // longitude: -118.5237,
        latitude: this.state.origLat,
        longitude: this.state.origLong,
        categories: "restaurants",
        limit: 20
      }
    }).then((res) => {
      this.setState({
        nearbyRestaurants: res.data.businesses,
        isLoaded: true
      });
    }).catch((err) => {
      console.log("Yelp request via Axios failed: " + err);
      return err;
    })
  }

  togglePopUp(data=null) {
      if (data) {
          this.setState({modalData: data}, 
              this.setState({showPopUp: !this.state.showPopUp})
          );
      }
      else {
          this.setState({showPopUp: !this.state.showPopUp});
      }
  }

  render() {  

    const url = Platform.select({
      ios: "maps:0,0?q=" + this.state.xCord + "," + this.state.yCord, 
      android: "geo:0,0?q=" + this.state.xCord + "," + this.state.yCord
    });
    
    if (!this.state.isLoaded) {
      return (
        <Container>

          <ScreenHeader navigation={this.props.navigation}>
          </ScreenHeader>

          <View style={{paddingLeft: 50, // distance slider
        paddingRight: 50,
        paddingBottom: 2,
        backgroundColor: 'transparent'}}>
            <Slider 
               minimumValue = {this.state.minSliderDist}
               maximumValue = {this.state.maxSliderDist}
               thumbStyle = '#6fdedc'
               thumbTintColor = '#6fdedc'
               step = {1}
               value={this.state.SliderDist}
               onValueChange={value => this.setState({SliderDist: value})}
            />
             <View style={{flexDirection: 'row',
             justifyContent: 'space-between'}}>
                    <Text style={{color:'grey', 
                    fontSize: 12}}>
                      {this.state.minSliderDist} mi</Text>
                    <Text style={{color:'red',
                    fontSize: 12}}>
                        {this.state.SliderDist + ' mi'}
                    </Text>
                    <Text style={{color:'grey',
                  fontSize: 12}}>
                      {this.state.maxSliderDist} mi</Text>
                </View>
        </View>

          <MapView
            style={{ flex: 5 }}
            region={{
              // 37.78825, -122.4324
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
          </MapView>

        </Container>
      )
    }
    else {
      region = {
        // 37.78825, -122.4324
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: this.state.latitudeDelta,
        longitudeDelta: this.state.longitudeDelta
      }
      zoomLevel = Math.log2(360 * ((screenWidth / 256) / region.longitudeDelta)) + 1;
      markerSize = 50;
      return (
      <Container>

        <ScreenHeader navigation = {this.props.navigation} title="Map">
        </ScreenHeader>
      
        <MapView
          style={{ flex: 5 }}
          intialRegion={region}
          showsPointsOfInterest={false}
          onRegionChangeComplete={(newRegion) => this.onRegionChangeComplete(newRegion)}
        >

          <Marker
            coordinate={{
              latitude: this.state.origLat,
              longitude: this.state.origLong
            }}
          />

          {
            this.state.nearbyRestaurants.map((marker, index) => {
              return(                
                <Marker                
                  key={index}
                  coordinate={{
                    latitude: marker.coordinates.latitude,
                    longitude: marker.coordinates.longitude
                  }}                  
                  onPress = {() => this.togglePopUp(marker)}
                  >                  
                  <View>
                    <Image
                        style={{ width: markerSize, height: markerSize, borderRadius: markerSize /2, borderWidth: 2, borderColor: "beige", left: 0 }}
                        source={{ uri: marker.image_url }}
                    />                    
                  </View>
                </Marker>                

              )
            })
          } 
        </MapView>

        {this.state.showPopUp ? 
          <Modal isVisible={this.state.showPopUp}>
            <MapPopUp data={this.state.modalData} onPress={this.togglePopUp} />
          </Modal>
          : null }

        {/* Filter Menu */}
       <TouchableOpacity>
        <View style={{
              backgroundColor: "grey", 
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#333",
              shadowOpacity: 1,
              shadowOffset:
                { x: 2, y: 0 },
              shadowRadius: 2,
              borderRadius: 30,
              position: "absolute",
              alignSelf: 'flex-end',
              marginTop: -540,
              right: 18
            }}>
        <Feather name='menu' style={{ fontSize: 25, color: "white" }} />
        </View>
        </TouchableOpacity> 
        
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SearchRestaurants',
              {
                lat: this.state.latitude,
                long: this.state.longitude,
                onGoBack: this.refresh
              }
            )}>
              <View style={{
              backgroundColor: "grey", 
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#333",
              shadowOpacity: 1,
              shadowOffset:
                { x: 2, y: 0 },
              shadowRadius: 2,
              borderRadius: 30,
              position: "absolute",
              bottom: 30,
              right: 20
            }}>
              <FontAwesome name='search' style={{ fontSize: 25, color: "white" }} />
            </View>
          </TouchableWithoutFeedback>
        </Container>
      )
    }
  }
}
export default Map; 
