import React, { Component } from 'react';
import {Left, Body, Right, Card, CardItem, Icon} from 'native-base';
import { View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
 
export default class ImageAndTextPlaceholder extends Component {
    render() {
        return (
            <CardItem>
                <Left>
                <View
                    style={{
                        width: 75,
                        height: 75,
                        borderRadius: 100,
                        backgroundColor: 'lightgray',
                        margin: 10
                    }}
                />
                    <Body>
                        <View style={{ width: 120, height: 25, backgroundColor: 'lightgray', marginBottom: 5}} />  
                        <View style={{ width: 150, height: 15, backgroundColor: 'lightgray', marginBottom: 5}} />
                        <View style={{ width: 100, height: 15, backgroundColor: 'lightgray', marginBottom: 5}} />  
                    </Body>
                </Left>
            </CardItem>
        )
    }
}