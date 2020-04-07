import React, { Component } from 'react';
import {Left, Body, Right, Card, CardItem, Icon, Grid, Row, Col} from 'native-base';
import { View } from 'react-native'
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SkeletonContent from "react-native-skeleton-content";
 
export default class PostCardPlaceholder extends Component {
    render() {
        return (
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
                        <View style={{ width: 120, height: 20, backgroundColor: 'lightgray', marginBottom: 5}} />  
                        <View style={{ width: 50, height: 15, backgroundColor: 'lightgray', marginBottom: 5}} />
                    </Body>
                </Left>
                </CardItem>
                
                <CardItem cardBody> 
        
                <View style={{ width: '100%', height: 200,  backgroundColor: 'gray', marginBottom: 5}} />
                
                <View style={{ width: 50, height: 15, backgroundColor: 'lightgray', marginBottom: 5}} />  
                <View style={{ width: 120, height: 15, backgroundColor: 'lightgray', marginBottom: 5}} />  
                </CardItem>
                <CardItem>
                <Left>
                    <Grid>
                        <Row>
                            <Col>
                                <AntDesign name={'meho'} color='lightgray' size={30} />
                            </Col>
                            <Col>
                                <Icon name="chatbubbles" style={{color: 'lightgray'}}/>        
                            </Col>
                        </Row>
                    </Grid>                  
                </Left>
                <Body>
                </Body>
                <Right>
                    <MaterialCommunityIcons name="fire" color="lightgray" size={35} />          
                </Right>
                </CardItem>
            </Card>
        )
       
    }
}