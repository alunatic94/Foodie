import React, { Component } from 'react';
import {User} from "../../database/User.js";
import {Button, Text, View} from "native-base";
import {firebase, db} from '../../database/Database';
import { withNavigation } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AquaMain} from '../../styles/global.js'

class ProfileButton extends Component {
    
    friends = db.collection("friends");

    constructor(props) {
        super(props);
        this.state = {
            isFriends: false
        };
    }

    componentDidMount() {
        friends.doc(User.getCurrentUserID()).get().then((doc) => {
            if (doc.exists) {
                this.setState({isFriends: doc.data()[this.props.userID]});
            }
        });
    }

    toggleFriend(userID) {
        var status = false;
        let ref = friends.doc(User.getCurrentUserID());
        let updates = {};
        ref.get().then((doc) => {
            if (!doc.exists) {
                status = true;
                updates[userID] = status;
                ref.set(updates);
            }
            else {
                status = !(doc.data()[userID]);
                updates[userID] = status;
                ref.update(updates);
            }
            this.setState({isFriends: status});
        });
    }
 
    render() {
            if (this.props.userID == User.getCurrentUserID()) {
                return(
                <Button
                rounded
                style={{backgroundColor: AquaMain}}
                onPress={() => this.props.navigation.navigate('ProfileEdit')}>
                    <Text>Edit</Text>
                </Button>
                );
            }
            else {
                return ( 
                    <Button
                    transparent
                    style={{ padding: 5 }}
                    onPress={() => this.toggleFriend(this.props.userID)}>
                        {this.state.isFriends ?
                        <View>
                            <MaterialCommunityIcons color="red" name="heart" size={35}/>
                        </View>
                        :
                        <View>
                            <MaterialCommunityIcons color="gray" name="heart" size={35}/>
                        </View>
                        }
                    </Button>
                )
            }
       
    }
}
export default withNavigation(ProfileButton);