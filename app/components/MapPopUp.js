import React, { Component } from 'react';
import { List, Card, CardItem, Text, Body, View, Button, ListItem, Left, Right, Thumbnail, H2 } from 'native-base';
import { Linking, Platform } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import {ScrollView} from "react-native";
import TitleAndIconsPlaceholder from './placeholders/TitleAndIconsPlaceholder';
import { globalStyles, AquaMain } from '../styles/global.js'

// Temp Image
const image = require('../screens/assets/howlin.png');
export default class MapPopUp extends Component{

    constructor(props){
        super(props);
        this.state = {
            url: Platform.select({
                ios: "maps:0,0?q=" + this.props.data.x + "," + this.props.data.y, 
                android: "geo:0,0?q=" + this.props.data.x + "," + this.props.data.y
            })
        };        
    }

    componentDidMount() {
        this.getPlates();
    }

    getPlates() {
        let plates = [];
        posts.where("yelpID", "==", this.props.data.id).orderBy("timestamp", "desc").limit(10).get().then(snapshot => {
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

     render(){
        return(
        
    <View>
        <Card>
            <CardItem header>
                <H2 style={globalStyles.heading}>{this.props.data.name}</H2>
                </CardItem>

            {this.state.arePlatesLoaded && 
                <CardItem>
                    <Body>
                        <H2 style={globalStyles.headingSmall}>Plates Eaten Here</H2>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{flexDirection: "row"}}>
                                {this.renderPlates(this.state.plates)}
                            </View>
                        </ScrollView>
                    </Body>
                </CardItem>
            }
                                           
                <CardItem footer style={{flexDirection: 'row', flexWrap: 'wrap'}}>                            
                    <FontAwesome name='mobile' style={{fontSize: 25, color: AquaMain, paddingRight: 5}}/>
                    <Text style={{paddingRight: 20}}>{this.props.data.phone}</Text>                            
                    <FontAwesome name='star' style={{fontSize: 20, color: AquaMain, paddingRight: 5, paddingLeft: 5}}/>
                    <Text>{this.props.data.rating}</Text>                            
            </CardItem> 
        </Card>
        <Card transparent>              
            <CardItem style={{backgroundColor: 'transparent'}}>
                <Left>
                <Button
                onPress={() => this.props.onPress()}
                style={{backgroundColor: AquaMain, margin: 0}}
                >
                    <FontAwesome name='close' style={{fontSize: 25, color: "white", paddingRight: 50, paddingLeft: 50}}/>
                </Button>
                </Left>
                <Right>
                <Button
                style={{backgroundColor: AquaMain}}
                onPress={() => {Linking.openURL((this.props.data.url))}}
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