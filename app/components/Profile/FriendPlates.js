import React, { Component } from 'react';
import { Text, Body, CardItem, H2 } from 'native-base';
import { Image } from "react-native"
import styles from '../../screens/styles.js';
import { Col, Grid } from 'react-native-easy-grid';
import {User} from "../../database/User.js";
import {ProfileDB} from "../../database/ProfileDB.js";

// function PlateModal(modalData, userData) {
//     return (
//         <View style={styles.profileModal}>
//             <PostCard style={{width: '100%'}} postID={modalData.id} post={modalData} user={userData} />
//             <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
//                 <Button
//                 rounded dark
//                 onPress={() => this.onPress()}
//                 style={{width: '25%'}}>
//                     <Text>Close</Text>
//                 </Button>
//             </View>
//         </View>
//     )
// }

export default class FriendPlates extends Component {
    
    renderFriendPlates(friendIDs) {

        // Combine all friend's plate posts for rendering
        let plates = [];
        friendIDs.map((friendID) => {
            posts.where("userID", "==", friendID)
                .limit(2) 
                .orderBy('timestamp', 'desc')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                      plates.push(doc.data());
                    });
                  })
                .catch(err => {
                console.log("Error getting friend's posts [id = " + friendID + "]: " + err);
                });
        });

        if (plates.length == 0) {
            return <Text style={styles.subheading}>None so far!</Text>;
        }

        else {
            let gridItems = [];
            for (let i = 0; i < plates.length; i += 2) {
                let rowItem = [];
                rowItem.push(plates[i]);
                if (plates[i + 1]) rowItem.push(plates[i + 1]);
                gridItems.push(rowItem);
              }
            return (
                gridItems.map((rowItem) => {
                    return(
                        <Grid key={`${rowItem[0].id}_grid`}>  
                            {
                                rowItem.map((item) => {
                                   var profileDB = new ProfileDB(this.props.userID);
                                    item.user = profileDB.getProfile();
                                    return (
                                        <Col onPress={() => {this.props.onPress(item)}} key={item.id} style={styles.columnStyle}>
                                                <Image style={{flex: 1, borderRadius: 20, backgroundColor: 'gray'}} source={{ uri: item.images[0] }}/>
                                           
                                            {/* <PlatePopup id={item.id} data={item}/>  */}
                                        </Col>
                                )})
                            }
                        </Grid>
                    )
                })
            );
        }
    }


    render() {
        return (
        <CardItem>
            <Body>
                <H2 style={styles.heading}>Friends' Recent Plates</H2>
                    {this.renderFriendPlates(this.props.friendIDs)}
            </Body>
        </CardItem>
        )
    }
}