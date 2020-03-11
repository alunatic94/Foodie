import React, { Component } from 'react';
import { Container, Content, DeckSwiper, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import { Image, ScrollView, View } from 'react-native';
import { Rating} from 'react-native-ratings';
import styles from '../screens/styles.js';
import ImageSlider from 'react-native-image-slider';
import PostCard from '../components/PostCard.js';
import LikeButton from '../components/LikeButton.js';
import RestaurantCard from './RestaurantCard.js';
import { withNavigation } from 'react-navigation';
import {db} from '../database/Database.js'

export default class FeedCard extends Component {
    postDoc = db.collection("posts").doc(this.props.postID);
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            // TODO: Add button on feed card to toggle between restaurant and post card
            isShowingRestaurant: false,
            isPostLoaded: false
        }
    }

    componentDidMount() {
        this.postDoc.get().then((doc) => {
            postData = doc.data();
            this.setState({
                post: postData,
                isPostLoaded: true
            })
        })
        .catch((err) => {
            console.log("Could not find user from ID '" + userID);
        });
    }
    render() {
        if (!this.state.isPostLoaded) {
            return (<View style={styles.roundCard}>
            </View>);
        }
        else {
            return (
            <View>
                {this.state.isShowingRestaurant ? 
                <RestaurantCard style={styles.roundCard} restaurantID={this.state.post.restaurantID} onLongPress={() => {this.setState({isShowingRestaurant: !this.state.isShowingRestaurant})}} /> : 
                <PostCard style={styles.roundCard} postID={this.props.postID} post={this.state.post} onLongPress={() => {this.setState({isShowingRestaurant: !this.state.isShowingRestaurant})}} />}
            </View>
            )
        }
    }
}