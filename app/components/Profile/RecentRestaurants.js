import React, { Component } from 'react';
import {Body, CardItem, H2, View} from 'native-base';
import {Text} from 'react-native-elements';
import CustomTooltip from '../common/CustomTooltip';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from "react-native";
import styles from '../../screens/styles.js';
 
export default class RecentRestaurants extends Component {

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


    async getRestaurant(yelpID) {
        axios.get('https://api.yelp.com/v3/businesses/' + yelpID, {
            headers: { 'Authorization': REACT_APP_MAP_AUTH }
        }).then((res) => {
            return res;
        }).catch((err) => {
            console.log(`Can't load recently visited restaurant [yelp ID = ${yelpID}] for user ID ${this.props.userID}`);
            return err;
        })
    }

    async getRecentRestaurants() {
        // Get yelp IDs from user's most recent posts
        yelpIDs = [];
        posts.where("userID", "==", this.props.userID)
            .orderBy('timestamp', 'desc')
            .limit(10)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    yelpIDs.push(doc.data().yelpID);
                });
                // this.setState(yelpIDs);
            })
            .catch(err => {
                console.log("Error getting user's posts [id = " + this.props.userID + "]: " + err);
            });

        // Get restaurant objects from yelp IDs
        for (let yelpID of yelpIDs) {
            restaurant = await this.getRestaurant(yelpID);
            this.state.restaurants.push(restaurant);
        }
        this.setState({isLoaded: true});
    }

    renderRestaurants = (restaurants) => {
        iconSize = 15;
        if (restaurants.length == 0) {
            return <Text style={styles.subheading}>None so far!</Text>;
        }
        else {
            return(
                restaurants.map((restaurant) => {
                    return (
                        <CustomTooltip key={restaurant.id} backgroundColor={"rgba(52, 52, 52, 0.8)"} withOverlay={false} popover={<Text style={{color: 'white'}}>{restaurant.name}</Text>}>
                            <Image
                                style={styles.padding}
                                style={{ width: iconSize, height: iconSize, borderRadius: iconSize /2, borderWidth: 0, left: 0 }}
                                source={{ uri: restaurant.image_url }}
                            /> 
                        </CustomTooltip>
                    );
                })
            )
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return <View />;
        }
        else return (
            <CardItem>
            <Body>
                <H2 style={styles.heading}>Recently Visited Restaurants</H2>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: "row"}}>
                    {this.renderRestauants(this.state.restaurants)}
                </View>
                </ScrollView>
            </Body>
        </CardItem>
        );
        
    }
}