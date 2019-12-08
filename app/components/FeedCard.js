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

export default class FeedCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: Replace this static placeholder variable with dynamic post object call from Post database collection
            postObject: {
                images: ["https://i.imgur.com/Ht5l5n.png", "https://i.imgur.com/Ht5l5n.png"],
                likes: 4,
                likes_who: "1234",
                rating: 'like',
                review: "It's good!",
                timestamp: "December 21, 2012",
                userID: "1234",
                restaurantID: "1"
            },
            // TODO: Add button on feed card to toggle between restaurant and post card
            isShowingRestaurant: false
        }
    }
    render() {
        return (
            <View style={styles.roundCard, {height: 325}}>
                {this.state.isShowingRestaurant ? 
                <RestaurantCard restaurantID={this.state.postObject.restaurantID} /> : 
                <PostCard postID={this.props.postID} post={this.state.postObject} />}
            </View>
        )
    }
}