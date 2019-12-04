import React, { Component } from "react";
import { Container, Content, DeckSwiper, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import { Image, ScrollView, View } from 'react-native';
import styles from '../screens/styles.js';
import ImageSlider from 'react-native-image-slider';
import { withNavigation } from 'react-navigation';
import LikeButton  from '../components/LikeButton.js';
const images = [require('../assets/images/burger.png'),
    require('../assets/images/hotdog.png'), 
    require('../assets/images/fish.png')];


class PostCard extends Component {
    
    render(){
        return (
            <Card>
                <CardItem>
                <Left>
                <Thumbnail source={this.props.profileImage} style={styles.circleSmall} />
                    <Body>
                    <Text style={styles.heading}>{this.props.name}</Text>
                    <Text style={styles.subheading}>{this.props.location}</Text>
                    </Body>
                </Left>
                </CardItem>
                <CardItem cardBody>
        
                <ImageSlider
                    style={styles.imageFeed}
                    images={images}
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
                    <Text style={styles.boldText}></Text>
                    <Text style={styles.lightText}>Comments</Text>
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
export default withNavigation(PostCard);