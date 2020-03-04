import MapView, { Marker } from "react-native-maps";
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import YelpRequest from "../handlers/YelpRequestHandler.js";
import axios from 'axios';
import { Dimensions } from 'react-native';
import ScreenHeader from '../components/common/ScreenHeader.js'
import { MapPopUp } from '../components/MapPopUp.js'
import { Container, List, Content, Card, CardItem, Body, Button, ListItem, Left, Right, Thumbnail } from 'native-base';
import { FontAwesome } from 'react-native-vector-icons';
import Modal from 'react-native-modal';
import { Linking } from 'react-native';

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
      yCord: ""
    };
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
      headers: { 'Authorization': 'Bearer 6wdE42fE4oWYKFvwpLn-FmGqaWQpmyjeAHQ2_jWwnuNqRB7-cSAkHcdOvxf4gK-3Xw3QDmGhHBv93U1e0yIsqjauRsKyW0fnbGE7VVBRbyLlSfSnbuSrbWP2karAXXYx' },
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

  togglePopUp = (name, phone, rating, x, y) => {
    console.log("Setting to true")
    // console.log(this.state.nearbyRestaurants[1])
    console.log(x + " " + y)
    this.setState({showPopUp: !this.state.showPopUp,
      restaurantName: name,
      restaurantPhone: phone,
      restaurantRating: rating,
      xCord: x,
      yCord: y
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <Container>

          <ScreenHeader navigation={this.props.navigation}>
          </ScreenHeader>

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
                  onPress = {() => this.togglePopUp(marker.name, marker.display_phone, marker.rating, marker.coordinates.latitude, marker.coordinates.longitude)}
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
            <View>
              <Modal isVisible={this.state.showPopUp}>              
                  <Card>
                      <CardItem header>
                          <Text>{this.state.restaurantName}</Text>
                          </CardItem>
                          <CardItem>
                          <Body>
                              <Text>
                                Plates
                              </Text>
                              <List>
                                  <ListItem avatar>
                                      <Left>
                                          <Thumbnail/>
                                      </Left>                                        
                                  </ListItem>                                    
                              </List>                                
                          </Body>
                          </CardItem>                            
                          <CardItem footer style={{flexDirection: 'row', flexWrap: 'wrap'}}>                            
                              <FontAwesome name='mobile' style={{fontSize: 25, color: "#6fdedc", paddingRight: 5}}/>
                              <Text style={{paddingRight: 20}}>{this.state.restaurantPhone}</Text>                            
                              <FontAwesome name='star' style={{fontSize: 20, color: "#6fdedc", paddingRight: 5}}/>
                              <Text>{this.state.restaurantRating}</Text>                            
                        </CardItem>
                  </Card>                  
                    <CardItem style={{backgroundColor: 'transparent'}}>
                      <Left>
                        <Button
                        onPress={() => {this.setState({showPopUp: false})}}
                        style={{backgroundColor: '#6fdedc', margin: 0}}
                        >
                          <FontAwesome name='close' style={{fontSize: 25, color: "white", paddingRight: 50, paddingLeft: 50}}/>
                        </Button>
                      </Left>
                      <Right>
                        <Button
                        style={{backgroundColor: '#6fdedc'}}
                        onPress={() => {Linking.openURL('maps:0,0?q=' + this.state.xCord + "," + this.state.yCord, 'geo:0,0?q=' + this.state.xCord + "," + this.state.yCord)}}
                        >                          
                          <FontAwesome name='rocket' style={{fontSize: 25, color: "white", paddingRight: 50, paddingLeft: 50}}/>
                        </Button>
                      </Right>
                    </CardItem>
              </Modal>                
          </View>
              : null}

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
              right: 20,
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