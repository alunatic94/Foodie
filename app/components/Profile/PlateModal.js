import React, { Component } from 'react';
import {Text, Button, View } from 'native-base';
import PostCard from '../../components/PostCard.js';
import {AquaMain} from '../../styles/global.js';

export default class PlateModal extends Component {                                     
    render() {
        return (
        <View style={{backgroundColor: 'transparent'}}>
            
            <PostCard style={{width: '100%'}} postID={this.props.data.id} post={this.props.data} user={this.props.user} />
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                rounded
                onPress={() => this.props.onPress()}
                style={{width: '25%', backgroundColor: AquaMain}}>
                    <Text>Close</Text>
                </Button>
            </View>
        </View>
        )
    }
}