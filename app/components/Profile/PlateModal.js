import React, { Component } from 'react';
import {Text, Button, View } from 'native-base';
import styles from '../../screens/styles.js';
import PostCard from '../../components/PostCard.js';

export default class PlateModal extends Component {                                     
    render() {
        return (
        <View style={styles.profileModal}>
            <PostCard style={{width: '100%'}} postID={this.props.data.id} post={this.props.data} user={this.props.user} />
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                rounded dark
                onPress={() => this.props.onPress()}
                style={{width: '25%'}}>
                    <Text>Close</Text>
                </Button>
            </View>
        </View>
        )
    }
}