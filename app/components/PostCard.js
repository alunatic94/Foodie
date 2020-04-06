import React, { Component } from "react";
import { Container, Content, DeckSwiper, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header, Grid, Row, Col } from 'native-base';
import { Image, ScrollView, View } from 'react-native';
import styles from '../screens/styles.js';
import ImageSlider from 'react-native-image-slider';
import { withNavigation } from 'react-navigation';
import LikeButton  from '../components/LikeButton.js'; 
import { User } from "../database/User.js";
import Moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PostCardPlaceholder  from '../components/placeholders/PostCardPlaceholder.js';
import {firebase, db} from '../database/Database'

restaurants = db.collection("restaurants");
import LikePage from '../screens/LikePage.js';

const defaultImages = ['http://lorempixel.com/400/200/food/', 
    'http://lorempixel.com/400/200/food/', 
    'http://lorempixel.com/400/200/food/'];

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
            isLoaded: false,
            images: defaultImages,
            restaurantName: ''
        }
    }

    componentDidMount() {
       this.loadUser();
       var restaurantRef = restaurants.doc(this.props.post.yelpID);
       restaurantRef.get().then(doc => {
           this.setState({
               restaurantName: doc.get('restaurant_name')
           });
       })
    }

    loadUser = () => {
        if (this.props.user != undefined) {
            this.setState({
                user: this.props.user,
                isLoaded: true
            });
        }
        else {
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
        
    }
   returnRatingIcon(){
        if(this.props.post.rating == 'meh'){
            return(
                <AntDesign name={'meho'} color={'black'}
                size={30}
                 />
            )
        }else if(this.props.post.rating == 'like'){
            return(
                <AntDesign name={'like1'} color={'green'}
                size={30}
                 />
            )
        }else if(this.props.post.rating == 'dislike'){
            return(
                <AntDesign name={'dislike1'} color={'red'}
                size={30}
                 />
            )
        }
   }
    
    render() {
        if (!this.state.isLoaded) {
            return (
                <PostCardPlaceholder style={this.props.style} />
                );
        }
        else {
            return (
            <Card>
                 <CardItem button onPress={() => this.props.navigation.navigate('ProfileOther', {userID: this.props.post.userID})}>
                <Left>
                    <Thumbnail style={{backgroundColor: 'lightgray'}} source={{uri: this.state.user.profileImage}} />
                    <Body>
                        <Text style={styles.heading}>{this.state.user.username}</Text>  
                        <Text style={styles.lightText}>{Moment(this.props.post.timestamp.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                    </Body>
                </Left>
                </CardItem>
                
                <CardItem cardBody> 
        
                {<ImageSlider
                    style={styles.imageFeed}
                    images={this.props.post.images}
                />}
                </CardItem>

                <CardItem>
                    <Body>
                        <Text style={[styles.lightText, {paddingBottom: 5}]}>{this.state.restaurantName}</Text>
                        <Text style={styles.regularText}>{this.props.post.caption}</Text>
                    </Body> 
                </CardItem>
                <CardItem>
                {/* <Left>                    
                    <LikeButton postID={this.props.postID}/> */}
                    <Left style={{paddingLeft: 0}}>
                        <Grid>
                            <Row>
                                <Col>
                                    {this.returnRatingIcon()}
                                </Col>
                                <Col>
                                    <Icon active name="chatbubbles" color="black" onPress={() => this.props.navigation.navigate('Comments', {postID: this.props.postID})}/>        
                                </Col>
                            </Row>
                        </Grid>
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                        <LikeButton postID={this.props.postID} post={this.props.post}/>
                    </Right>
                </CardItem>
                
            </Card>
            );
        }  
    }      
}
export default withNavigation(PostCard);