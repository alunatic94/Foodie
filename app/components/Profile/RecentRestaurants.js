import React, { Component } from 'react';
import {Body, CardItem, H2, View} from 'native-base';
import {Text} from 'react-native-elements';
import CustomTooltip from '../common/CustomTooltip';
import {Image, TouchableOpacity} from "react-native";
import styles from '../../screens/styles.js';
import { db } from '../../database/Database';
import axios from 'axios';
import { REACT_APP_MAP_AUTH } from 'react-native-dotenv';
import TitleAndIconsPlaceholder  from '../placeholders/TitleAndIconsPlaceholder';
import {ScrollView} from "react-native";


 
export default class RecentRestaurants extends Component {
    posts = db.collection("posts");

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getRecentRestaurants();
    }


    getRestaurant(yelpID) {
        // new Promise((resolve, reject) => {
        return (
            axios.get('https://api.yelp.com/v3/businesses/' + yelpID, {
            headers: { 'Authorization': REACT_APP_MAP_AUTH }
            })
            .then((res) => {
                // console.log("getRestSaurant: yelpID = " + yelpID);
                return res;
            })
            .catch((err) => {
                console.log(`Can't load recently visited restaurant [yelp ID = ${yelpID}] for user ID ${this.props.userID}: \n${err}`);
                return getRestaurant(yelpID);
            })
        )
        // });
    }

    async getRestaurantsFromIDs(yelpIDs) {
        // console.log("getRestaurantsFromIDs: yelpIDs = " + yelpIDs);
        let restaurants = [];
        // Get restaurant objects from yelp IDs
        for (let yelpID of yelpIDs) {
            // console.log("getRestaurantsFromIDs for loop: yelpID = " + yelpID);
            restaurant = await this.getRestaurant(yelpID);
            if (restaurant != null) restaurants.push(restaurant);
            // console.log("getRestaurantsFromIDs inside then: restaurant = " + JSON.stringify(restaurant));
        }
        // console.log("getRestaurantsFromIDs after: restaurants = " + JSON.stringify(restaurants));
        return restaurants;
    }

    getRecentRestaurants() {
        // Get yelp IDs from user's most recent posts
        yelpIDs = [];
        this.posts.where("userID", "==", this.props.userID)
            .orderBy('timestamp', 'desc')
            .limit(10)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (!yelpIDs.includes(doc.data().yelpID)) yelpIDs.push(doc.data().yelpID);
                    // console.log("getRecentRestaurants - grabbing snapshot: => " + doc.data().yelpID);
                });
                // this.setState(yelpIDs);
            })
            .then(() => {
                this.getRestaurantsFromIDs(yelpIDs).then((restaurants) => {
                    // console.log("getRecentRestaurants: restaurants = " + restaurants);
                    this.setState({restaurants: restaurants, isLoaded: true});
                })
            })
            .catch(err => {
                console.log("Error getting user's posts [id = " + this.props.userID + "]: " + err);
            });
    }

    renderRestaurants = (restaurants) => {
        iconSize = 50;
        if (restaurants.length == 0) {
            return <Text style={styles.lightText}>None so far!</Text>;
        }
        else {
            return(
                restaurants.map((restaurant) => {
                    return (
                        // <CustomTooltip key={`${restaurant.data.id}_tooltip`} backgroundColor={"rgba(52, 52, 52, 0.8)"} withOverlay={false} popover={<Text style={{color: 'white'}}>{restaurant.data.name}</Text>}>
                        <TouchableOpacity 
                            key={`${restaurant.data.id}_wrap`}
                            onPress={() => this.props.onPress({type: 'restaurant', data: restaurant.data})}>
                            <Image
                                key={`${restaurant.data.id}_img`}
                                style={{ width: iconSize, height: iconSize, borderRadius: iconSize / 2, borderWidth: 0, backgroundColor: 'lightgray', margin: 5}}
                                source={{ uri: restaurant.data.image_url }}
                            /> 
                        </TouchableOpacity>
                    );
                })
            )
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return <TitleAndIconsPlaceholder title="Recently Visited"/>;
        }
        else return (
            <CardItem>
            <Body>
                <H2 style={styles.heading}>Recently Visited</H2>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: "row"}}>
                        {this.renderRestaurants(this.state.restaurants)}
                    </View>
                </ScrollView>
            </Body>
        </CardItem>
        );
        
    }
}