import React, { Component } from 'react';
import { List, Card, CardItem, Text, Body, View, Button, ListItem, Left, Right, Thumbnail, H2 } from 'native-base';
import { Linking, Platform } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import {ScrollView} from "react-native";
import TitleAndImagesPlaceholder from './placeholders/TitleAndIconsPlaceholder';
import { globalStyles, AquaMain } from '../styles/global.js';
import { Rating } from 'react-native-ratings';
import { db} from '../database/Database';

// Temp Image
const image = require('../screens/assets/howlin.png');
export default class MapPopUp extends Component {
    posts = db.collection("posts");

    constructor(props){
        super(props);
        this.state = {
            url: Platform.select({
                ios: `maps:${this.props.data.coordinates.latitude},${this.props.data.coordinates.longitude}?q=${this.props.data.name}`,
                android: `geo:${this.props.data.coordinates.latitude},${this.props.data.coordinates.longitude}?q=${this.props.data.name}`
            })
        };        
    }

    componentDidMount() {
        this.getPlates();
    }
    
    getPlates() {
        let plates = [];
        this.posts.where("yelpID", "==", this.props.data.id).orderBy("timestamp", "desc").limit(10).get().then(snapshot => {
            snapshot.forEach(doc => {
                plate = doc.data();
                if (!plate.id) plate.id = doc.id;
                plates.push(plate);
            });
            this.setState({plates, arePlatesLoaded: true});
        })
        .catch(err => {
            console.log("Error getting plate posts for " + this.props.data.id + ": " + err);
        });
    }

    renderPlates = (plates) => {
        iconSize = 50;
        if (plates.length == 0) {
            return <Text style={globalStyles.lightText}>None so far!</Text>;
        }
        else {
            return(
                plates.map((plate) => {
                    return (
                        <Thumbnail key={`${plate.id}_img`}
                            style={{ width: iconSize, height: iconSize, borderRadius: iconSize / 2, borderWidth: 0, backgroundColor: 'lightgray', margin: 5}}
                            source={{ uri: plate.images[0] }}
                        /> 
                    );
                })
            )
        }
    }

    renderRestaurantInformation() {
        iconSize = 75;
        return (
            <View>
                <CardItem style={[globalStyles.cardItem, {paddingBottom: 0, paddingTop: 0}]}>
                    <H2 style={globalStyles.heading}>{this.props.data.name}</H2>   
                </CardItem>
                <CardItem style={[globalStyles.cardItem, {flexDirection: 'row', flexWrap: 'no-wrap'}]}>
                    <Thumbnail key={`${this.props.data.id}_main_img`}
                        style={{ width: iconSize, height: iconSize, borderRadius: 10, borderWidth: 0, backgroundColor: 'lightgray', margin: 5}}
                        source={{ uri: this.props.data.image_url }}
                    /> 
                    <View style={{paddingLeft: 10, flexDirection: 'column', flexWrap: 'no-wrap', justifyContent: 'flex-start', alignItems: 'flex-start'}}>                    
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start'}}> 
                            <Rating
                                style={{justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap'}}
                                ratingCount={5}
                                startingValue={this.props.data.rating}
                                imageSize={20}
                                showRating={false}
                                readonly={true}
                            />
                            <Text style={globalStyles.lightText}> ({this.props.data.review_count})</Text> 
                        </View>
                        <Text style={globalStyles.lightText}>{this.props.data.categories[0].title}</Text>
                    </View>
                 </CardItem>
            </View>
        );
    }

    renderRestaurantCategories() {
        let categoryNames = [];
        this.props.data.categories.forEach((category, index) => {
            categoryNames.push(category.title + (index < this.props.data.categories.length - 1 ? ", " : ""));
        });
    return (categoryNames.map((name) => {return <Text style={globalStyles.lightText}>{name}</Text>}));
    }

    renderPlatesEaten() {
        iconSize = 50;
        return (
            <CardItem style={globalStyles.cardItem}>
                <Body>
                    <H2 style={globalStyles.headingSmall}>Plates Eaten Here</H2>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.state.arePlatesLoaded && <View style={{flexDirection: "row"}}>
                            {this.renderPlates(this.state.plates)}
                        </View>}
                    </ScrollView>
                </Body>
            </CardItem>
        );
    }

    renderBottomInformation() {
        let numLikes, percLikes = 0;
        if (this.state.arePlatesLoaded && this.state.plates.length > 0) {
            numLikes = this.state.plates.filter((plate) => plate.rating === "like").length;
            percLikes = (numLikes / this.state.plates.length * 100).toFixed(1);
        }
        return(
            <CardItem footer style={[globalStyles.cardItem, {flexDirection: 'row', flexWrap: 'wrap'}]}>                            
                <FontAwesome name='mobile' style={{fontSize: 25, color: AquaMain, paddingRight: 5}}/>
                <Text style={{paddingRight: 20}} onPress={() => {Linking.openURL(`tel:${this.props.data.phone}`)}}>{this.props.data.phone}</Text>                            
                {numLikes && <FontAwesome name='thumbs-up' style={{fontSize: 20, color: AquaMain, paddingRight: 5, paddingLeft: 5}}/>}
                {numLikes && this.state.plates.length > 0 && <Text>{`${percLikes}%`}</Text>}                        
            </CardItem>
        );
    }


     render(){
        return(
            
        
    <View>
        <Card style={globalStyles.card}>
            {this.renderRestaurantInformation()}
            {this.renderPlatesEaten()}
            {this.renderBottomInformation()}
        </Card>
        <Card transparent>              
            <CardItem style={{backgroundColor: 'transparent'}}>
                <Left>
                <Button
                rounded
                onPress={() => this.props.onPress()}
                style={{backgroundColor: AquaMain, margin: 0}}
                >
                    <FontAwesome name='close' style={{fontSize: 25, color: "white", paddingRight: 50, paddingLeft: 50}}/>
                </Button>
                </Left>
                <Right>
                <Button
                rounded
                style={{backgroundColor: AquaMain}}
                onPress={() => {Linking.openURL((this.state.url))}}
                >                          
                    <FontAwesome name='rocket' style={{fontSize: 25, color: "white", paddingRight: 50, paddingLeft: 50}}/>
                </Button>
                </Right>
            </CardItem>
        </Card>
    </View>
        );   
     } 
    
}