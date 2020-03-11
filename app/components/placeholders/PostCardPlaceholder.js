import React, { Component } from 'react';
import {Left, Body, Right, Card, CardItem, Icon} from 'native-base';
import { View } from 'react-native'
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
 
export default class PostCardPlaceholder extends Component {
    render() {
        return (
            // <SkeletonPlaceholder>
               <Card>
                 <CardItem>
                <Left>
                <View
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        backgroundColor: 'lightgray',
                        marginBottom: 5
                    }}
                />
                    <Body>
                        <View style={{ width: 120, height: 15, backgroundColor: 'lightgray', marginBottom: 5}} />  
                        <View style={{ width: 50, height: 15, backgroundColor: 'lightgray', marginBottom: 5}} />
                        <View style={{ width: 120, height: 15, backgroundColor: 'lightgray', marginBottom: 5}} />  
                    </Body>
                </Left>
                </CardItem>
                
                <CardItem cardBody> 
        
                <View style={{ width: '100%', height: 200,  backgroundColor: 'gray', marginBottom: 5}} />  
                </CardItem>
                <CardItem>
                <Left>                    
                </Left>
                <Body>
                </Body>
                <Right>
                <AntDesign name={'meho'} color={'lightgray'}
                    size={30}
                />
                </Right>
                </CardItem>
            </Card>
            // </SkeletonPlaceholder>
        )
       
    }
}