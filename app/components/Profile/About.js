import React, { Component } from 'react';
import {Text, Body, CardItem, H2} from 'native-base';
import styles from '../../screens/styles.js';

export default class About extends Component {
    render() {
        return (
        <CardItem>
            <Body>
                <H2 style={styles.heading}>About</H2>
                <Text style={styles.subheading}>
                    {this.props.data}
                </Text>
            </Body>
        </CardItem>
        );
        
    }
}