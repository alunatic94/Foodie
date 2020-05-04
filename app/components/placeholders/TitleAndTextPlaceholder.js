import React, { Component } from 'react';
import {Left, Body, Right, Card, CardItem, Icon, H2} from 'native-base';
import { View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { globalStyles } from '../../styles/global.js';
 
export default class TitleAndTextPlaceholder extends Component {
    render() {
        return (
        <CardItem>
            <Body>
                {this.props.title ?
                <H2 style={globalStyles.heading}>{this.props.title}</H2>
                :
                <View style={{ width: 120, height: 25, backgroundColor: 'lightgray', marginBottom: 5}} />
                }
                <View style={{flexDirection: "row"}}>
                    <View style={{ width: 150, height: 15, backgroundColor: 'lightgray', marginBottom: 5}} />
                </View>
            </Body>
        </CardItem>
        )
    }
}