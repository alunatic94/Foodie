import React, { Component } from 'react';
import { Container, Content, DeckSwiper, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import { Image, ScrollView, View } from 'react-native';
import { Rating} from 'react-native-ratings';
import styles from '../screens/styles.js';
import ImageSlider from 'react-native-image-slider';
import CardItems from '../components/CardItems.js';
import LikeButton from '../components/LikeButton.js';

const mainInfo = {
    profileImage: require('../screens/assets/dog.png'),
    name: 'Name',
    location: 'Northridge, CA',
    comments: '10',
    likes: '4',
    hours: '11'
}

const restaurantInfo = {
    image: require('../assets/images/burger.png'),
    name: 'Arbor Grill',
    category: 'American',
    rating: 3.5,
    numRatings: 10
}
const images = [require('../assets/images/burger.png'),
    require('../assets/images/hotdog.png'), 
    require('../assets/images/fish.png')];

const cards = [
    {
      part: 'main',
      cardImages: images,
    },
    {
     part: 'info',
    }
];

function FeedCardItem(props) {
    const {card} = props;
    if (card.part == 'main') {
        return <CardItems/>
    }
    else {        
        return RestaurantInfo();
    }
}

function RestaurantInfo() {
    return (
        <Card>
            <CardItem style={{padding: 10}}>
                <Left>
                <Thumbnail source={restaurantInfo.image} style={styles.roundSquare} />
                </Left>
                <Body>
                <Text style={styles.headingLarge}>{restaurantInfo.name}</Text>
                <Rating
                    imageSize={20}
                    readOnly={true}
                    startingValue={restaurantInfo.rating}
                />
                <Text style={styles.lightText}>({restaurantInfo.numRatings})</Text>
                <Text style={styles.subheadingLarge}>{restaurantInfo.category}</Text>
                </Body>
            </CardItem>
            <CardItem style={{padding: 10, paddingTop: 50}} cardBody>
             <Text style={styles.headingLarge}>More Plates Eaten Here</Text>
            </CardItem>
                <CardItem>
                <Body>
                    <ScrollView horizontal style={{flex: 1}}>
                         <Image source = {images[0]} style={styles.imageFeedSmall} />
                         <Image source = {images[1]} style={styles.imageFeedSmall} />
                         <Image source = {images[2]} style={styles.imageFeedSmall} />
                    </ScrollView>
                </Body>
                </CardItem>
            </Card>
    );
}

export default class FeedCard extends Component {
    render() {
        return (
            <View style={styles.roundCard}>
                <DeckSwiper style={{height: 325}}
                dataSource={cards}
                renderEmpty={() => <RestaurantInfo />}
                renderItem={item => <FeedCardItem card={item} />}
                />
            </View>
        )
    }
}