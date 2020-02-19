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

posts = db.collection("posts");

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
            modalData: null
        }
    }
    componentDidMount() {
        this.loadProfileInformation();
    }

    async loadProfileInformation() {
        var profileDB = new ProfileDB(this.state.userID);

        // // Fetch profile data after component instance created
        // await profileDB.getProfile().then((profile) => {
        //     this.setState({currentProfile: profile});
        // });
        // await loadBadges();
        // await loadPlates();
        // this.setState({isProfileLoaded: true});
        // Fetch profile data after component instance created
        await profileDB.getProfile().then((profile) => {
            this.setState({currentProfile: profile}, () => {
                BadgesDB.getBadgesFromIDs(this.state.currentProfile.badges).then((newBadges) => {
                    this.setState({badges: newBadges}, () => {
                        profileDB.getPlatesFromIDs(this.state.currentProfile.plates).then((newPlates) => {
                            this.setState({plates: newPlates, isProfileLoaded: true});
                        });
                    });
                });
            });
        });
        // await loadBadges();
        // await loadPlates();
        // this.setState({isProfileLoaded: true});
        // }
    }

    async loadBadges() {
        BadgesDB.getBadgesFromIDs(this.state.currentProfile.badges).then((newBadges) => {
            this.setState({badges: newBadges});
        });
    }

    async loadPlates() {
        profileDB.getPlatesFromIDs(this.state.currentProfile.plates).then((newPlates) => {
            this.setState({plates: newPlates});
        });
    }

    toggleModal(data=null) {
        console.log("\ntapped\n");
        if (data) {this.setState({modalData: data})};
        this.setState({modalVisible: !this.state.modalVisible}); 
    }

    // Loop through badges list and add Icon component for each one                                       
    renderBadges = (badges) => {
        if (badges.length == 0) {
            return <Text style={styles.subheading}>None so far!</Text>;
        }
        else {
            return(
                badges.map((badge) => {
                    <Tooltip popover={<Text>{badge.badgeID}</Text>}>
                    <Icon name={badge.icon} style={styles.padding} withOverlay={false} />
                </Tooltip>
                })
            )
        }
    }

    // Loop through user's plate IDs and add image component for each one                                       
    renderPlates = (plates) => {

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
                        <Grid key={rowItem[0].id}>
                            {
                                rowItem.map((item) => {
                                    return (
                                        <Col onPress={() => {this.toggleModal(item)}} key={item.id} style={styles.columnStyle}>
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
        // Render empty profile screen until data is finished being fetched
        if (!this.state.isProfileLoaded) {
            return (<Container>
                <ScreenHeader navigation = {this.props.navigation}>
                </ScreenHeader>

                <Content styles={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
                <ActivityIndicator size="large" color="#ddd" />
                </Content>
            </Container>)
        }
        else return (
            <Container>
                <ScreenHeader navigation = {this.props.navigation} title="Profile">
                </ScreenHeader>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail large source={{uri: this.state.currentProfile.profileImage}} />
                                <Body style={{flex: 3}}>
                                    <H1 style={styles.headingLarge}>{this.state.currentProfile.first} {this.state.currentProfile.last}</H1>
                                    <Text note style={styles.subheadingLarge}>{this.state.currentProfile.age}</Text>
                                    <Text note style={styles.subheadingLarge}>{this.state.currentProfile.tagline}</Text>
                                </Body>
                                <Button
                                 rounded dark
                                 onPress={() => this.props.navigation.navigate('ProfileEdit')}>
                                     <Text>Edit</Text>
                                </Button>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <H2 style={styles.heading}>About</H2>
                                <Text style={styles.subheading}>
                                    {this.state.currentProfile.about}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <H2 style={styles.heading}>Badges</H2>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{flexDirection: "row"}}>
                                    {this.renderBadges(this.state.badges)}
                                </View>

                                </ScrollView>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <H2 style={styles.heading}>Plates Eaten</H2>
                                    {this.renderPlates(this.state.plates)}
                                    <Modal isVisible={this.state.modalVisible}>
                                        {this.state.modalData ? 
                                            <View style={styles.profileModal}>
                                                 <PostCard style={{width: '100%'}} postID={this.state.modalData.id} post={this.state.modalData} />
                                                 <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                                        <Button
                                                        rounded dark
                                                        onPress={() => this.toggleModal()}
                                                        style={{width: '25%'}}>
                                                            <Text>Close</Text>
                                                        </Button>
                                                    </View>
                                            </View>
                                         :
                                         ""
                                         }
                                    </Modal>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        )
    }
}