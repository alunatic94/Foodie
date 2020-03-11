import React, { Component } from 'react';
import {Body, CardItem, H2, Icon, Tooltip, View, Text} from 'native-base';
import {ScrollView} from "react-native";
import styles from '../../screens/styles.js';
 
export default class Badges extends Component {
    // Loop through badges list and add Icon component for each one                                       
    renderBadges = (badges) => {
        if (badges.length == 0) {
            return <Text style={styles.subheading}>None so far!</Text>;
        }
        else {
            return(
                badges.map((badge) => {
                    <Tooltip popover={<Text>{badge.badgeID}</Text>}>
                    <Icon name={badge.icon} style={styles.padding} withOverlay={false} />
                </Tooltip>
                })
            )
        }
    }

    render() {
        return (
            <CardItem>
            <Body>
                <H2 style={styles.heading}>Badges</H2>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: "row"}}>
                    {this.renderBadges(this.props.data)}
                </View>

                </ScrollView>
            </Body>
        </CardItem>
        );
        
    }
}