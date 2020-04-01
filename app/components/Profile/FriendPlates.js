import React, { Component } from 'react';

export default class FriendPlates extends Component {

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
                    this.setState(plates);
                })
                .catch(err => {
                console.log("Error getting friend's posts [id = " + friendID + "]: " + err);
                });
        });
    }

    render() {
        return (
            <Plates heading="Friends' Recent Plates" data={this.state.plates} onPress={this.props.toggleModal} /> 
        )
    }
}