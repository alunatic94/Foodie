import React, { Component } from 'react';
import { db } from '../../database/Database';
import Plates  from './Plates';
import {View} from 'native-base';
import TitleAndImagesPlaceholder  from '../placeholders/TitleAndImagesPlaceholder';

posts = db.collection("posts");
friends = db.collection("friends");

export default class FriendPlates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plates: [],
            friendIDs: this.props.friendIDs,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getPlatesFromFriendIDs(this.state.friendIDs);
        this.addFriendsListener();
    }
    
    componentWillUnmount(){
        this.removeFriendsListener();
    }

    removeFriendsListener() {
        friends.doc(this.props.userID).onSnapshot(() => {});
    }

    addFriendsListener() {
        friends.doc(this.props.userID).onSnapshot(doc => {
            let modifiedFriendIDs = [];       
            if (doc.exists) {
                const userIDs = doc.data();
                for (let id in userIDs) {
                    if (userIDs[id]) modifiedFriendIDs.push(id);
                }
            }
            this.getPlatesFromFriendIDs(modifiedFriendIDs);
            this.setState({friendIDs: modifiedFriendIDs});
        });
    }

    getPlatesFromFriendIDs(friendIDs) {
        // Combine all friend's plate posts for rendering
        let plates = [];
        friendIDs.map((friendID) => {
            posts.where("userID", "==", friendID)
                .orderBy('timestamp', 'desc')
                .limit(2)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {    
                        plates.push(doc.data());
                    });
                    this.setState({plates: plates, isLoaded: true});
                })
                .catch(err => {
                console.log("Error getting friend's posts [id = " + friendID + "]: " + err);
                });
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <TitleAndImagesPlaceholder small title="Friends' Recent Plates"/>;
        }
        else if (!this.state.plates || this.state.plates.length == 0) {
            return <View />;
        }
        else return (
            <Plates small heading="Friends' Recent Plates" data={this.state.plates} onPress={this.props.onPress} /> 
        )
    }
}