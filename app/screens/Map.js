
import MapView, {Marker} from "react-native-maps";
import { Container, Left, Body, Right,  Button, Header, Item, Icon, Input, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js';

import React, { Component } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


class Map extends React.Component{ 
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
	  latitude: 0,
	  longitude: 0,
	  error: null
    };
}

searchOn = () => {
  this.setState({ showSearch: true});
};
searchOff = () => {
  this.setState({ showSearch: false});
};

 componentDidMount() {
	 navigator.geolocation.getCurrentPosition(
		position => {
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				error:null
			});
		},
		error => this.setState({error: error.message }),
			{enableHighAccuracy:true, timeout: 200000, maximumAge: 2000}
	)
 };



	   


    render(){
      return(        
          <Container>

            <Header searchBar rounded>
                  <Left>
                    <Button 
                        transparent
                         onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                        <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Left>

                  <Body>
                  {this.state.showSearch ?
                    <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                    <Button transparent>
                     <Text onPress={this.searchOff}>Cancel</Text>
                  </Button>
                    </Item>
                  :
                    <Text style={styles.heading}>Find a Restaurant</Text>
                  }
                  </Body>

                 
                  <Right>
                  {this.state.showSearch ?
                    null
                  :
                    <Button transparent onPress={this.searchOn}>
                      <Icon name="ios-search" />
                    </Button>
                  }
                   
                    <Button 
                      transparent
                      onPress={() => logout(this.props.navigation)}>
                         <AntDesign name='logout' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Right>
            </Header>



            <MapView
              style={{flex: 5}}
              region={{
                // 37.78825, -122.4324
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
			>
			<Marker coordinate={this.state} />
			</MapView>
              
          </Container>        
      )
    }
  }
  export default Map; 