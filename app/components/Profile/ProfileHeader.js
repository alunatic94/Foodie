import React, { Component } from 'react';
import {Text, Left, Body, Thumbnail, CardItem, H1} from 'native-base';
import styles from '../../screens/styles.js';
import ProfileButton  from './ProfileButton.js'; 
 
export default class ProfileHeader extends Component {
    render() {
        return (
            <CardItem>
            <Left>
                <Thumbnail large source={{uri: this.props.data.profileImage}} />
                <Body style={{flex: 3}}>
                    <H1 style={styles.headingLarge}>{this.props.data.first} {this.props.data.last}</H1>
                    <Text note style={styles.subheadingLarge}>{this.props.data.age}</Text>
                    <Text note style={styles.subheadingLarge}>{this.props.data.tagline}</Text>
                </Body>
                 <ProfileButton userID={this.props.userID} />
            </Left>
        </CardItem>
        )
       
    }
}