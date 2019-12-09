import React, { Component } from 'react';
import { Container, Text, Left, Body, Right, Button, Header, Content, Thumbnail, Card, CardItem, H1, H2, Icon, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, ScrollView, ActivityIndicator } from "react-native"
import {BadgesDB} from "../database/BadgesDB.js"
import {ProfileDB} from "../database/ProfileDB.js"
import {User} from "../database/User.js"
import styles from './styles.js';
import {firebase, db} from '../database/Database';

const thumbnail = "";
const platesURL = [
    "https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/201938/0181/williams-sonoma-pantry-dinner-plates-set-of-6-c.jpg",
    "https://www.restaurantware.com/media/catalog/product/cache/9acef7d1ef9b6ecea35dddea8ea8fdff/R/W/RWP0063B-3-LR.jpg",
    "https://cdnimg.webstaurantstore.com/images/products/large/4929/1826256.jpg",
    "https://assets.bonappetit.com/photos/5c1aa25bee0b2a2ce1c0e906/1:1/w_400%2Cc_limit/FGFP-Loaded-Sweet-Potato-New-Crop.jpg",
    "https://www.lomonosov-russia.com/sites/default/files/dinner.jpg",
    "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/10/26/50-states-50-plates/alabama-white-bbq-sauce.jpg.rend.hgtvcom.966.644.suffix/1491581554822.jpeg"
];
export default class Profile extends Component {
    constructor(props) {
        super(props);
        // Defaults
        this.state = {
            userID: this.props.navigation.getParam('userID', User.getCurrentUserID()),
            currentProfile: null,
            isProfileLoaded: false, 
            badges: []
        }
    }
    componentDidMount() {
        // Fetch profile data after component instance created
        (new ProfileDB(this.state.userID)).getProfile().then((profile) => {
            this.setState({currentProfile: profile}, () => {
                BadgesDB.getBadgesFromIDs(this.state.currentProfile.badges).then((newBadges) => {
                    this.setState({
                        badges: newBadges,
                        isProfileLoaded: true
                    });
                });
            });
        });
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
    render() {
        // Render empty profile screen until data is finished being fetched
        if (!this.state.isProfileLoaded) {
            return (<Container>
                <Header>
                  <Left>
                    <Button 
                        transparent
                         onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                        <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Left>
                      <Body>
                        <Text style={styles.heading}>Profile</Text>
                    </Body>

                  <Right>
                    <Button 
                        transparent
                        onPress={() => logout(this.props.navigation)}>
                         <AntDesign name='logout' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Right>
                </Header>
                <Content styles={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
                <ActivityIndicator size="large" color="#ddd" />
                </Content>
            </Container>)
        }
        else return (
            <Container>
                <Header>
                  <Left>
                    <Button 
                        transparent
                         onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                        <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Left>
                      <Body style={styles.headerBody}>
              <Text style={styles.heading}>{this.state.userID == User.getCurrentUserID() ? "Profile" : this.state.currentProfile.username}</Text>
            </Body>

                  <Right>
                    <Button 
                        transparent
                        onPress={() => logout(this.props.navigation)}>
                         <AntDesign name='logout' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Right>
                </Header>
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
                                    {/* <Icon name="bonfire" style={styles.padding} />
                                    <Icon name="bowtie" style={styles.padding} />
                                    <Icon name="cafe" style={styles.padding} />
                                    <Icon name="card" style={styles.padding} />
                                    <Icon name="logo-freebsd-devil" style={styles.padding} />
                                    <Icon name="images" style={styles.padding} />
                                    <Icon name="pizza" style={styles.padding} />
                                    <Icon name="trophy" style={styles.padding} /> */}
                                </View>

                                </ScrollView>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <H2 style={styles.heading}>Plates Eaten</H2>
                                <Grid>
                                    <Col style={styles.columnStyle}>
                                        <Image style={{ flex: 1, borderRadius: 20}} source={{ uri: platesURL[0] }} />
                                    </Col>
                                    <Col style={styles.columnStyle}>
                                        <Image style={{ flex: 1, borderRadius: 20}} source={{ uri: platesURL[1] }} />
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Col style={styles.columnStyle}>
                                        <Image style={{ flex: 1, borderRadius: 20}} source={{ uri: platesURL[2] }} />
                                    </Col>
                                    <Col style={styles.columnStyle}>
                                        <Image style={{ flex: 1, borderRadius: 20}} source={{ uri: platesURL[3] }} />
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Col style={styles.columnStyle}>
                                        <Image style={{ flex: 1, borderRadius: 20}} source={{ uri: platesURL[4] }} />
                                    </Col>
                                    <Col style={styles.columnStyle}>
                                        <Image style={{ flex: 1, borderRadius: 20}} source={{ uri: platesURL[5] }} />
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        )
    }
}