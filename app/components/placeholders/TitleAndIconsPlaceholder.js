import React, { Component } from 'react';
import {Left, Body, Right, Card, CardItem, Icon, H2} from 'native-base';
import { View } from 'react-native'
import styles from '../../screens/styles.js';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
 
export default class TitleAndIconsPlaceholder extends Component {
    render() {
        return (
        <CardItem>
            <Body>
                {this.props.title ?
                <H2 style={styles.heading}>{this.props.title}</H2>
                :
                <View style={{ width: 120, height: 25, backgroundColor: 'lightgray', marginBottom: 5}} />
                }
                <View style={{flexDirection: "row"}}>
                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'lightgray', margin: 5}} />
                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'lightgray', margin: 5}} />
                </View>
            </Body>
        </CardItem>
        )
    }
}