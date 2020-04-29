import React, { Component } from 'react';
import {Text, Body, CardItem, H2} from 'native-base';
import { globalStyles } from '../../styles/global.js';

export default class About extends Component {
    render() {
        return (
        <CardItem>
            <Body>
                <H2 style={globalStyles.heading}>About</H2>
                <Text style={globalStyles.regularText}>
                    {this.props.data}
                </Text>
            </Body>
        </CardItem>
        );
        
    }
}