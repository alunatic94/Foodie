import React, { Component } from 'react';
import { db } from '../database/Database.js';

export default class LikedPlates extends Component {

    // Firebase structure is:
    //      Posts
    //          --| Likeby
    //                  --| docID (userID)
    // likedByUser grabs the userID documents of ALL likeby subcollections of ALL posts
    // To get the corresponding post for each document, we need to get the parent Likeby subcollection, THEN parent post doc
    
    likedByUser = db.collectionGroup("Likeby")
        .where("userID", "==", this.props.userID)
        .orderBy("timestamp", "desc")
        .limit(10);

    getPlatesFromLikes(user) {
        let plates = [];
        likedByUser.get().then(snapshot => {
            snapshot.forEach(doc => {
                parentPostDoc = doc.ref().parent().parent();
                parentPost = parentPostDoc.data();
                plates.push(parentPost);
            });
            this.setState(plates);
        })
        .catch(err => {
            console.log("Error getting recently liked posts [user id = " + this.props.userID + "]: " + err);
        });
    }

    render() {
        return (
            <Plates heading="Recently Liked Plates" data={this.state.plates} onPress={this.props.onPress} /> 
        )
    }
}