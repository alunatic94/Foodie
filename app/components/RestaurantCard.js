import React, { Component } from 'react';
import { Card, CardItem, Body, Text, Left, Thumbnail } from 'native-base';
import { Image, ScrollView, View } from 'react-native';
import styles from '../screens/styles.js';

const images = [require('../assets/images/burger.png'),
    require('../assets/images/hotdog.png'), 
    require('../assets/images/fish.png')];

export default class RestaurantCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantID: this.props.restaurantID || "1234"
        }
    }

    componentDidMount() {
        // TODO: Grab restaurant ID from post database document
        //       Pass to component state
    }

    render() {
        return (
            <Card>
            <CardItem style={{padding: 10}}>
                <Left>
                <Thumbnail source={this.state.mainImage} style={styles.roundSquare} />
                </Left>
                <Body>
                <Text style={styles.headingLarge}>{this.state.name}</Text>
                <Rating
                    imageSize={20}
                    readOnly={true}
                    startingValue={this.state.rating}
                />
                <Text style={styles.lightText}>({this.state.numRatings})</Text>
                <Text style={styles.subheadingLarge}>{this.state.category}</Text>
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
        )
    }
}