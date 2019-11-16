import React, { Component } from 'react';
import { Container, Text, Left, Body, Right, Button, Header, Content, Thumbnail, Card, CardItem, H1, H2, Icon, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, ScrollView } from "react-native"

const thumbnail = "https://p7.hiclipart.com/preview/358/473/173/computer-icons-user-profile-person-thumbnail.jpg";
const platesURL = [
    "https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/201938/0181/williams-sonoma-pantry-dinner-plates-set-of-6-c.jpg",
    "https://www.restaurantware.com/media/catalog/product/cache/9acef7d1ef9b6ecea35dddea8ea8fdff/R/W/RWP0063B-3-LR.jpg",
    "https://cdnimg.webstaurantstore.com/images/products/large/4929/1826256.jpg",
    "https://assets.bonappetit.com/photos/5c1aa25bee0b2a2ce1c0e906/1:1/w_400%2Cc_limit/FGFP-Loaded-Sweet-Potato-New-Crop.jpg",
    "https://www.lomonosov-russia.com/sites/default/files/dinner.jpg",
    "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/10/26/50-states-50-plates/alabama-white-bbq-sauce.jpg.rend.hgtvcom.966.644.suffix/1491581554822.jpeg"
];
const styles = {
    padding: {paddingLeft: 10, paddingRight: 10, paddingTop: 10},
    columnStyle: { height: 200, padding: 10 }
}

export default class Profile extends Component {
    render() {
        return (
            <Container>
                <Header>
                  <Left>
                    <Button 
                        transparent
                         onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                        <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Left>
                  
                  <Body>
              <Text style={styles.heading}>Your Profile</Text>
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
                                <Thumbnail large source={{uri: thumbnail}} />
                                <Body>
                                    <H1>Valentino Rossi</H1>
                                    <Text note>Twin Ring Motegi - ツインリンクもてぎ</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <H2>About</H2>
                                <Text style={{color: "grey"}}>
                                    From Urbino, Italy{"\n"}    
                                    Seven-time MotoGP World Champion{"\n"}
                                    Likes Italian and Japanese food
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <H2>Badges</H2>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{flexDirection: "row"}}>
                                    <Icon name="bonfire" style={styles.padding} />
                                    <Icon name="bowtie" style={styles.padding} />
                                    <Icon name="cafe" style={styles.padding} />
                                    <Icon name="card" style={styles.padding} />
                                    <Icon name="logo-freebsd-devil" style={styles.padding} />
                                    <Icon name="images" style={styles.padding} />
                                    <Icon name="pizza" style={styles.padding} />
                                    <Icon name="trophy" style={styles.padding} />
                                </View>
                                </ScrollView>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <H2>Plates Eaten</H2>
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