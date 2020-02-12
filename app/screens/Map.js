
import MapView, { Marker } from "react-native-maps";
import { Container } from 'native-base';
import React, { Component } from 'react';
import {View, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import YelpRequest from "../handlers/YelpRequestHandler.js";
import axios from 'axios';
import { Dimensions } from 'react-native';
import ScreenHeader from '../components/common/ScreenHeader.js'

const screenWidth = Dimensions.get('window').width;
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121,
      error: null,
      nearbyRestaurants: [],
      autocompleteResults: [],
      isLoaded: false,
      zoomLevel: 16
    };
  }

  searchOn = () => {
    this.setState({ showSearch: true });
  };
  searchOff = () => {
    this.setState({ showSearch: false });
  };

  // async getRestaurantsByRadius() {
  //   await axios.get('https://api.yelp.com/v3/businesses/search', {
  //     headers: { 'Authorization': 'Bearer 6wdE42fE4oWYKFvwpLn-FmGqaWQpmyjeAHQ2_jWwnuNqRB7-cSAkHcdOvxf4gK-3Xw3QDmGhHBv93U1e0yIsqjauRsKyW0fnbGE7VVBRbyLlSfSnbuSrbWP2karAXXYx' },
  //     params: {
  //       latitude: 34.2383,
  //       longitude: -118.5237,
  //       categories: "restaurants",
  //       limit: 2
  //     }
  //   }).then((res) => {
  //     console.log("1");
  //     this.setState({
  //       nearbyRestaurants: res.data.businesses,
  //       isLoaded: true
  //     });
  //     console.log("2");
  //     return res.data.businesses;
  //   }).catch((err) => {
  //     //console.log("Yelp request via Axios failed: " + err);
  //     return err;
  //   })


  // }

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
    return Math.log2(360 * ((screenWidth/256) / region.longitudeDelta)) + 1;
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
  autocompleteRestaurants = () => {
    axios.get('https://api.yelp.com/v3/autocomplete', {
        headers: { 'Authorization': 'Bearer 6wdE42fE4oWYKFvwpLn-FmGqaWQpmyjeAHQ2_jWwnuNqRB7-cSAkHcdOvxf4gK-3Xw3QDmGhHBv93U1e0yIsqjauRsKyW0fnbGE7VVBRbyLlSfSnbuSrbWP2karAXXYx' },
        params: {
            text: "in",
            latitude: this.state.origLat,
            longitude: this.state.origLong,
            categories: "restaurants",
            limit: 20
        }
    }).then((res) => {
        this.setState({
            autocompleteResults: res.data,
            isLoaded: true
        });
    }).catch((err) => {
        console.log("Yelp request via Axios failed: " + err);
        return err;
    })
}

  render() {
    if (!this.state.isLoaded) {
      return (
        <Container>

          <ScreenHeader navigation = {this.props.navigation}>
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
      zoomLevel = Math.log2(360 * ((screenWidth/256) / region.longitudeDelta)) + 1;
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
                  title={marker.name}
                  description={marker.categories[0].title}
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

      </Container>
      )
    }
  }
}
export default Map; 