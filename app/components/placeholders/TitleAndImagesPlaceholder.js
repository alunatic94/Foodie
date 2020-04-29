import React, { Component } from 'react';
import {Left, Body, Right, Card, CardItem, Icon, H2} from 'native-base';
import { View } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Col, Grid } from 'react-native-easy-grid';
import styles from '../../screens/styles.js';
import { globalStyles } from '../../styles/global.js'
 
export default class TitleAndImagesPlaceholder extends Component {
    render() {
        return (
        <CardItem>
            <Body>
                {this.props.title ?
                <H2 style={globalStyles.heading}>{this.props.title}</H2>
                :
                <View style={{ width: 120, height: 25, backgroundColor: 'lightgray', marginBottom: 5}} />
                }
                <Grid>     
                    <Col style={this.props.small ? styles.columnSmall : styles.columnStyle}>
                            <View style={{flex: 1, margin: 5, borderRadius: 20, backgroundColor: 'lightgray'}}/>
                    </Col>
                    <Col style={this.props.small ? styles.columnSmall : styles.columnStyle}>
                            <View style={{flex: 1, margin: 5, borderRadius: 20, backgroundColor: 'lightgray'}}/>
                    </Col>
                </Grid>
            </Body>
        </CardItem>
        )
    }
}