import React, { Component } from "react";
import { Container, Content, DeckSwiper, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import { Image, ScrollView, View } from 'react-native';
import styles from '../screens/styles.js';
import ImageSlider from 'react-native-image-slider';
import { withNavigation } from 'react-navigation';
import LikeButton  from '../components/LikeButton.js';
import { User } from "../database/User.js";
const images = [require('../assets/images/burger.png'),
    require('../assets/images/hotdog.png'), 
    require('../assets/images/fish.png')];

const postDefaults = {
    images: ["https://i.imgur.com/Ht5l5n.png", "https://i.imgur.com/Ht5l5n.png"],
    likes: 4,
    likes_who: "1234",
    rating: 'like',
    review: "It's good!",
    timestamp: "December 21, 2012",
    userID: "1234",
    restaurantID: "1"
};

class PostCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.navigation.getParam('post', postDefaults),
            user: {},
            isLoaded: false
        }
    }

    getPostUser = async () => {
        return new User.getCurrent();
    }

    componentWillMount() {
        this.getPostUser().then((loadedUser) => {
            this.setState({
                user: loadedUser,
                isLoaded: true
            })
        })
        .catch((err) => {
            console.log(err + ":" + "Could not load user [id = " + this.state.post.userID + "] for post");
        })
    }

   
    
    render() {
        if (!this.state.isLoaded) {
            return (
                <Card>
                </Card>
                );
        }
        else {
            return (
            <Card>
                <CardItem>
                <Left>
                <Thumbnail source={this.state.user.profileImage} style={styles.circleSmall} />
                    <Body>
                    <Text style={styles.heading}>{this.props.user.username}</Text>
                    <Text style={styles.subheading}>{this.props.post.timestamp}</Text>
                    </Body>
                </Left>
                </CardItem>
                <CardItem cardBody>
        
                <ImageSlider
                    style={styles.imageFeed}
                    images={this.state.post.images}
                />
                </CardItem>
                <CardItem>
                <Left>                    
                    <LikeButton/>
                </Left>
                <Body>
                    <Button
                    onPress={() => this.props.navigation.navigate('Comments')}>
                    <Icon active name="chatbubbles" />
                    {/* <Text style={styles.boldText}></Text>
                    <Text style={styles.lightText}>Comments</Text> */}
                    </Button>
                </Body>
                <Right>
                    <Text style={styles.lightTextSmall}></Text>
                </Right>
                </CardItem>
            </Card>
            );
        }  
    }      
}
export default withNavigation(PostCard);