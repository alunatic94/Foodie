import React, { Component } from 'react';
import { Text, Body, CardItem, H2 } from 'native-base';
import { Image } from "react-native"
import styles from '../../screens/styles.js';
import { Col, Grid } from 'react-native-easy-grid';
import {User} from "../../database/User.js";
import {ProfileDB} from "../../database/ProfileDB.js";

export default class Plates extends Component {
    // Loop through user's plate IDs and add image component for each one                                       
    renderPlates = (plates) => {

        if (!plates || plates.length == 0) {
            return <Text style={styles.subheading}>None so far!</Text>;
        }

        else {
            let gridItems = [];
            for (let i = 0; i < plates.length; i += 2) {
                let rowItem = [];
                rowItem.push(plates[i]);
                if (plates[i + 1]) rowItem.push(plates[i + 1]);
                gridItems.push(rowItem);
              }
            return (
                gridItems.map((rowItem) => {
                    return(
                        <Grid key={`${rowItem[0].id}_grid`}>  
                            {
                                rowItem.map((item) => {
                                    if (this.props.user) {
                                        item.user = this.props.user;
                                    }
                                    else {
                                        var profileDB = new ProfileDB(item.userID);
                                        item.user = profileDB.getProfile();
                                    }
                                    return (
                                        <Col onPress={() => {this.props.onPress(item)}} key={item.id} style={styles.columnStyle}>
                                                <Image style={{flex: 1, borderRadius: 20, backgroundColor: 'gray'}} source={{ uri: item.images[0] }}/>
                                           
                                            {/* <PlatePopup id={item.id} data={item}/>  */}
                                        </Col>
                                )})
                            }
                        </Grid>
                    )
                })
            );
        }
    }

    render() {
        return (
        <CardItem>
            <Body>
                <H2 style={styles.heading}>{this.props.heading}</H2>
                    {this.renderPlates(this.props.data)}
            </Body>
        </CardItem>
        )
    }
}