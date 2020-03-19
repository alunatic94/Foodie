import React, { Component } from 'react';
import { Container, Text, Left, Body, Right, Button, Header, Content, Thumbnail, Card, CardItem, H1, H2, Icon, View } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, ScrollView, ActivityIndicator, FlatList, Dimensions, StyleSheet } from "react-native"
import {BadgesDB} from "../database/BadgesDB.js"
import {ProfileDB} from "../database/ProfileDB.js"
import {User} from "../database/User.js"
import styles from './styles.js';
import {firebase, db} from '../database/Database';
import ScreenHeader from '../components/common/ScreenHeader.js';
import PlatePopup from '../components/PlatePopup.js';
import Modal from "react-native-modal";
import PostCard  from '../components/PostCard.js'; 
import ProfileHeader  from '../components/Profile/ProfileHeader.js'; 
import About  from '../components/Profile/About';
import Badges  from '../components/Profile/Badges';
import Plates  from '../components/Profile/Plates';
import FriendPlates  from '../components/Profile/FriendPlates';
import PlateModal  from '../components/Profile/PlateModal'; 
import { useFocusEffect } from '@react-navigation/native';

posts = db.collection("posts");
users = db.collection("users");
friends = db.collection("friends");

const thumbnail = "";
const platesURL = [
    "https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/201938/0181/williams-sonoma-pantry-dinner-plates-set-of-6-c.jpg",
    "https://www.restaurantware.com/media/catalog/product/cache/9acef7d1ef9b6ecea35dddea8ea8fdff/R/W/RWP0063B-3-LR.jpg",
    "https://cdnimg.webstaurantstore.com/images/products/large/4929/1826256.jpg",
    "https://assets.bonappetit.com/photos/5c1aa25bee0b2a2ce1c0e906/1:1/w_400%2Cc_limit/FGFP-Loaded-Sweet-Potato-New-Crop.jpg",
    "https://www.lomonosov-russia.com/sites/default/files/dinner.jpg",
    "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/10/26/50-states-50-plates/alabama-white-bbq-sauce.jpg.rend.hgtvcom.966.644.suffix/1491581554822.jpeg"
];
const plateCols = 2;
const plateSize = 150; //Dimensions.get('window').width / plateCols;
const plateStyles = StyleSheet.create({
  container: {
    width: plateSize,
    height: plateSize,
    backgroundColor: 'blue'
  },
  item: {
    flex: 1,
    margin: 3
  }
});

export default class Profile extends Component {
    constructor(props) { 
        super(props);
        // Defaults
        this.state = {
            userID: this.props.navigation.getParam('userID', User.getCurrentUserID()),
            currentProfile: null,
            isProfileLoaded: false, 
            badges: [],
            plates: [],
            friends: []
        }

        // Bind to Profile context so calls pop-up for plates tapped
        this.toggleModal = this.toggleModal.bind(this);
    }
    componentDidMount() {
        this.loadProfileInformation();
        this.addListeners();
    }

    componentWillUnmount(){
        this.removeListeners();
    }

    addListeners() {
        this.addPostsListener();
        this.addProfileListener();
    }

    removeListeners() {
        // this.removeNavigationListener();
        this.removePostsListener();
        this.removeProfileListener();
    }

    removePostsListener() {
        this.posts.onSnapshot(() => {});
    }
    
    removeProfileListener() {
        this.users.onSnapshot(() => {});
    }

    addProfileListener() {
        users.doc(this.state.userID).onSnapshot(doc => {         
            modifiedProfile = doc.data();
            this.setState({currentProfile: modifiedProfile}, () => {
                BadgesDB.getBadgesFromIDs(this.state.currentProfile.badges).then((newBadges) => {
                    this.setState({badges: newBadges});
                });
            });
        });
    }

    addPostsListener() {
        // Listen for updates/removals/deletions in plates posted by user
        // Grab changed post documents and update array of plates stored in state
        users.where("userID", "==", this.state.userID).onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    plates = this.state.plates;
                    addedPlate = change.doc.data();
                    plates.unshift(addedPlate);
                    this.setState({plates});
                }
                if (change.type === "modified") {
                    modifiedPlate = change.doc.data();
                    var i = this.state.plates.findIndex(x => x.id == modifiedPlate.id);
                    plates = this.state.plates;
                    plates[i] = modifiedPlate;
                    this.setState({plates});
                }
                if (change.type === "removed") {
                    removedPlate = change.doc.data();
                    var i = this.state.plates.indexOf(removedPlate);
                    plates = this.state.plates;
                    plates.splice(i, 1);
                    this.setState({plates});
                }
            });
        });
    }

    async loadProfileInformation() {
        var profileDB = new ProfileDB(this.state.userID);

        // Fetch profile data after component instance created
        await profileDB.getProfile().then((profile) => {
            this.setState({currentProfile: profile}, () => {
                BadgesDB.getBadgesFromIDs(this.state.currentProfile.badges).then((newBadges) => {
                    this.setState({badges: newBadges}, () => {
                        profileDB.getPlatesFromIDs(this.state.currentProfile.plates).then((newPlates) => {
                            this.setState({plates: newPlates, isProfileLoaded: true}, () => {
                               let friendIDs = [];
                               friends.doc(this.state.userID).get().then((doc) => {
                                   if (doc.exists) {
                                       const userIDs = doc.data();
                                       for (let id in userIDs) {
                                           if (userIDs[id]) friendIDs.push(id);
                                       }
                                   }
                                   this.setState({friends: friendIDs});
                               })
                            });
                        });
                    });
                });
            });
        });
    }

    toggleModal(data=null) {
        if (data) {
            this.setState({modalData: data}, 
                this.setState({modalVisible: !this.state.modalVisible})
            );
        }
        else {
            this.setState({modalVisible: !this.state.modalVisible});
        }
    }

    toggleFriend(userID) {
        friends.doc(User.getCurrentUserID()).update({userID: true});
    }

    render() {
        // Render empty profile screen until data is finished being fetched
        if (!this.state.isProfileLoaded) {
            return (<Container>
                <ScreenHeader navigation = {this.props.navigation}>
                </ScreenHeader>

                <Content styles={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#ddd" />
                </Content>
            </Container>)
        }
        else return ( 
            <Container>
            <ScreenHeader navigation = {this.props.navigation}>
            </ScreenHeader>
            <Content>
                <Card transparent noShadow>
                    <ProfileHeader userID={this.state.userID} data={this.state.currentProfile} />
                    <About data={this.state.currentProfile.about} />
                    <Badges data={this.state.badges} />
                    <Plates userID={this.state.userID} user={this.state.currentProfile} data={this.state.plates} onPress={this.toggleModal} />
                    
                    {this.state.friends.length > 0 ? <FriendPlates friendIDs={this.state.friends}/> : <View />}
                   
                </Card>
                <Modal isVisible={this.state.modalVisible}>
                    {this.state.modalData ? <PlateModal data={this.state.modalData} user={this.state.modalData.user} onPress={this.toggleModal}/> : <View />}
                </Modal>

            </Content>
        </Container>
        )
    }
}