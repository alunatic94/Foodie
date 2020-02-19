import React, { Component } from "react";
import { Container, Content, DeckSwiper, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import { Image, ScrollView, View } from 'react-native';
import styles from '../screens/styles.js';
import ImageSlider from 'react-native-image-slider';
import { withNavigation } from 'react-navigation';
import LikeButton  from '../components/LikeButton.js';
import PostCard  from '../components/PostCard.js';
import { User } from "../database/User.js";
import Modal from "react-native-modal";
import Moment from 'moment';

class PlatePopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    componentWillMount() {
    }
   
    render() {
        return (
            <View style={{flex: 1, borderRadius: 20, backgroundColor: 'gray'}}>
                <Image style={{flex: 1, borderRadius: 20}} source={{ uri: this.props.data.images[0] }}/>
            </View>
        );
    }      
}
export default withNavigation(PlatePopup);