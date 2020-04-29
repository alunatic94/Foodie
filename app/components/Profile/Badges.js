import React, { Component } from 'react';
import {Body, CardItem, H2, View} from 'native-base';
import {Text} from 'react-native-elements';
import CustomTooltip from '../../components/common/CustomTooltip';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from "react-native";
import styles from '../../screens/styles.js';
import { globalStyles } from '../../styles/global.js';
 
export default class Badges extends Component {
    // Loop through badges list and add Icon component for each one                                       
    renderBadges = (badges) => {
        if (badges.length == 0) {
            return <Text style={styles.lightText}>None so far!</Text>;
        }
        else {
            return(
                badges.map((badge) => {
                    return (
                        <CustomTooltip key={badge.badgeID} backgroundColor={"rgba(52, 52, 52, 0.8)"} withOverlay={false} popover={<Text style={{color: 'white'}}>{badge.description}</Text>}>
                            <Icon key={badge.badgeID} name={badge.icon} style={styles.padding} size={30} />
                        </CustomTooltip>
                    );
                })
            )
        }
    }

    render() {
        return (
            <CardItem>
            <Body>
                <H2 style={globalStyles.heading}>Badges</H2>
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