import React, { Component } from 'react';
import { Container, Text, Left, Body, Right, Button, Header, Content, Thumbnail, Card, CardItem, H1, H2, Icon, View } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, ScrollView, ActivityIndicator, FlatList, Dimensions, StyleSheet } from "react-native"
import {BadgeData} from "../database/BadgeData.js"
import {ProfileData} from "../database/ProfileData.js"
import {User} from "../database/User.js";
import styles from './styles.js';
import {db} from '../database/Database';
import ScreenHeader from '../components/common/ScreenHeader.js';
import Modal from "react-native-modal";
import ProfileHeader  from '../components/Profile/ProfileHeader.js'; 
import About  from '../components/Profile/About';
import Badges  from '../components/Profile/Badges';
import Plates  from '../components/Profile/Plates';
import LikedPlates  from '../components/Profile/LikedPlates';
import RecentRestaurants  from '../components/Profile/RecentRestaurants';
import FriendPlates  from '../components/Profile/FriendPlates';
import PlateModal  from '../components/Profile/PlateModal'; 
import MapPopUp  from '../components/MapPopUp'; 
import ProfilePlaceholder  from '../components/placeholders/ProfilePlaceholder'; 
import TitleAndImagesPlaceholder  from '../components/placeholders/TitleAndImagesPlaceholder'; 
import TitleAndIconsPlaceholder from '../components/placeholders/TitleAndIconsPlaceholder.js';

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

export default class ProfileOther extends Component {
    constructor(props) {
        super(props);
        // Defaults
        this.state = {
            userID: this.props.navigation.getParam('userID', User.getCurrentUserID()),
            currentProfile: null,
            isProfileLoaded: false, 
            badges: [],
            plates: [],
            modalData: null
        }
    
        // Bind to Profile context so calls pop-up for plates tapped
        this.toggleModal = this.toggleModal.bind(this);
    }
    componentDidMount() {
        this.getCurrentUser();
        this.loadProfileInformation();
        this.addListeners();
    }

    componentWillUnmount(){
        this.removeListeners();
    }

    addListeners() {
        this.addPostsListener();
        this.addProfileListener();
        this.addNavigationListeners();
    }

    removeListeners() {
        // this.removeNavigationListener();
        this.removePostsListener();
        this.removeProfileListener();
    }

    removePostsListener() {
        posts.onSnapshot(() => {});
    }
    
    removeProfileListener() {
        users.doc(this.state.userID).onSnapshot(() => {});
    }

    addProfileListener() {
        users.doc(this.state.userID).onSnapshot(doc => {         
            modifiedProfile = doc.data();
            this.setState({currentProfile: modifiedProfile}, () => {
                BadgeData.getBadgesFromIDs(this.state.currentProfile.badges).then((newBadges) => {
                    this.setState({badges: newBadges});
                });
            });
        });
    }

    addPostsListener() {
        // Listen for updates/removals/deletions in plates posted by user
        // Grab changed post documents and update array of plates stored in state
        posts.where("userID", "==", this.state.userID).onSnapshot(snapshot => {
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

    addNavigationListeners() {
        this.props.navigation.addListener(
            'willFocus',
            payload => {
              this.setState({
                  userID: this.props.navigation.getParam('userID', User.getCurrentUserID()),
                  isProfileLoaded: false
                }, this.loadProfileInformation);
            }
        );
        this.props.navigation.addListener(
            'willBlur',
            payload => {
              this.setState({userID: User.getCurrentUserID(), isProfileLoaded: false});
            }
        );
    }

    async loadProfileInformation() {
        var profileData = new ProfileData(this.state.userID);

        profileData.getProfile().then((profile) => {
            this.setState({currentProfile: profile, isProfileLoaded: true});

            BadgeData.getBadgesFromIDs(profile.badges).then((newBadges) => {
                this.setState({badges: newBadges, areBadgesLoaded: true});
            });

            profileData.getPlatesFromIDs(profile.plates).then((newPlates) => {
                this.setState({plates: newPlates, arePlatesLoaded: true});
            });
            
            let friendIDs = [];
            friends.doc(this.state.userID).get().then((doc) => {
                if (doc.exists) {
                    const userIDs = doc.data();
                    for (let id in userIDs) {
                        if (userIDs[id]) friendIDs.push(id);
                    }
                }
                this.setState({friends: friendIDs, areFriendsLoaded: true});
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

    getCurrentUser = () => {
        User.getCurrent().then(currentUser => {
          this.setState({currentUser});
        });
    }

    isCurrentUser() {
        return this.state.userID == User.getCurrentUserID();
    }

    isFriendsWithCurrentUser() {
        friends.doc(User.getCurrentUserID()).get()
        .then((doc) => {
            if (doc.get(this.state.userID) != null) return true;
            else return false;
        })
    }

    render() {
        // Render empty profile screen until data is finished being fetched
        if (!this.state.isProfileLoaded) {
            return <ProfilePlaceholder other />;
        }
        else return ( 
            <Container>
            <ScreenHeader back navigation = {this.props.navigation} title={this.state.currentProfile.username}/>
            <Content>
                <Card transparent noShadow>
                    {/*Personal Information */}
                    <ProfileHeader userID={this.state.userID} data={this.state.currentProfile} />
                    <About data={this.state.currentProfile.about} />
                    <Badges data={this.state.badges} />

                    {/* Plates */}
                    {this.state.arePlatesLoaded ? 
                        <Plates 
                            heading="Their Recent Plates"
                            user={this.state.currentProfile}
                            data={this.state.plates}
                            onPress={this.toggleModal}
                        /> 
                    : 
                        <TitleAndImagesPlaceholder title="Their Recent Plates" /> 
                    }

                    <LikedPlates userID={this.state.userID} onPress={this.toggleModal} />

                    {/* Friends' Plates */}
                    {this.state.areFriendsLoaded ? 
                        <FriendPlates
                            userID={this.state.userID}
                            friendIDs={this.state.friends}
                            onPress={this.toggleModal}
                        />
                    :
                        <TitleAndImagesPlaceholder small title="Friends' Recent Plates" />
                    }

                    {/* Restaurants */}
                    <RecentRestaurants 
                        userID={this.state.userID}
                        yelpIDs={this.state.plates.map(plate => plate.yelpID)}
                        onPress={this.toggleModal}
                    />
                   
                </Card>

                {/* Modal Popups */}
                {this.state.modalData ? 
                    <Modal isVisible={this.state.modalVisible}>
                        {this.state.modalData.type == 'plate' && <PlateModal data={this.state.modalData.data} user={this.state.modalData.data.user} onPress={this.toggleModal}/>}
                        {this.state.modalData.type == 'restaurant' && <MapPopUp data={this.state.modalData.data} onPress={this.toggleModal} />}
                    </Modal>
                    : 
                    <View />
                }

            </Content>
        </Container>
        )
    }
}