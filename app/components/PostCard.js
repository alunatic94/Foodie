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
    userID: "W5eaN2HwBBeYzTtEKGqwzDByUh12",
    restaurantID: "1"
};

const dummyUser = {
    userID: "W5eaN2HwBBeYzTtEKGqwzDByUh12",
    username: "dummy",
    first: "Dummy",
    last: "User",
    age: 99,
    email: "dummy@user.com",
    profileImage: 'https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png',
    badges: [],
    tagline: 'Dummy',
    about: "I'm a dummy user.",
    plates: []
}

class PostCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isLoaded: false
        }
    }

    componentWillMount() {
       this.loadUser();
    }

    loadUser = () => {
        User.getExisting(this.props.post.userID).then((loadedUser) => {
            this.setState({
                user: loadedUser,
                isLoaded: true
            })
        })
        .catch((err) => {
            console.log(err + ":" + "Could not load user [id = " + this.props.post.userID + "] for post");
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
                <Thumbnail source={{uri: this.state.user.profileImage}} style={styles.circleSmall} />
                    <Body>
                    <Text style={styles.heading}>{this.state.user.username}</Text>
                    <Text style={styles.subheading}>{this.props.post.timestamp}</Text>
                    </Body>
                </Left>
                </CardItem>
                <CardItem cardBody>
        
                <ImageSlider
                    style={styles.imageFeed}
                    images={this.props.post.images}
                />
                </CardItem>
                <CardItem>
                <Left>                    
                    <LikeButton/>
                </Left>
                <Body>
                    <Button
                    onPress={() => this.props.navigation.navigate('Comments', {postID: this.props.postID})}>
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