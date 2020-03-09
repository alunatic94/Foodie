import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Button, Container, Header, Left, Footer, Right, ListItem, Thumbnail, Content, Item, Input, Body } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, firebase } from "../database/Database.js";
import { User } from "../database/User.js";
import { ProfileDB } from "../database/ProfileDB.js"
import { withNavigation, ScrollView } from "react-navigation";
//import Comment from "../components/Comment.js";
import styles from '../screens/styles.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeButton from '../components/LikeButton.js';
//import { ref } from '@hapi/joi';

class LikePage extends Component {
  //liketoinsert=db.collection('posts').doc(this.props.navigation.getParam('postID', 'Qe1PUrFY32K8EYL9UYqW')).collection('Likeby');

  posts = db.collection("posts");
  users = db.collection("users");
  docArray = []

  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.navigation.getParam('userID', User.getCurrentUserID()),
      postID: '',
      likeUserID: [],
      likeUsername: [],
      isLoaded: false,
      profileLoaded: false,
      namesLoaded: false,
      user: User.dummyUser
    };
  }

  async componentDidMount() {
    var arr = [];
    test = db.collection('posts').doc(this.props.navigation.state.params.postID).collection('Likeby').get().then(snapshot => {
      snapshot.forEach(doc => {
        arr.push(doc.data().userID)
      }),
        this.setState({
          isLoaded: true,
          likeUserID: arr
        })
    }).catch(err => {
      console.log("Error getting Likeby")
    })
    var profileDB = new ProfileDB(this.state.userID);
    await profileDB.getProfile().then((profile) => {
      this.setState({
        currentProfile: profile,
        profileLoaded: true
      })
    });
    var docArray = []
    await this.state.likeUserID.map(user => {
      users.doc(user).get().then(doc => {
        var data = doc.data()
        docArray.push({ name: data.username, profilePic: data.profileImage, first: data.first, last: data.last })
        console.log(docArray)
        this.setState({
          likeUsername: docArray
        })
      }).catch(err => {
        console.log("Error getting username");
      })
      this.setState({ namesLoaded: true })
    })
  }


  getall = () => {

    const allLikes = this.liketoinsert
      .get()
      .then(snapshot => {
        let existingLikes = [];
        snapshot.forEach(doc => {
          existingLikes.push(doc.data());
        });
        this.setState({ likesArray: existingLikes });
      })


  };




  render() {
    if (this.state.isLoaded && this.state.profileLoaded && this.state.namesLoaded) {
      return (
        <Container>
          <Header>
            <Left>
              <Button
                iconLeft
                light
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Text> Users that Liked this Photo</Text>
          </Header>
          <Content style={{marginTop: 10}}>
            {
              this.state.likeUsername.map(name => {
                return (
                  <TouchableOpacity style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "left",
                    marginLeft: 20
                  }}>
                    <Image
                        style={{ width: 70, height: 70, borderRadius: 70 /2, borderWidth: 2, borderColor: "beige", left: 0 }}
                        source={{ uri: name.profilePic }}
                    />    
                    <Text style={{
                      color: "#000",
                      fontFamily: "Raleway Bold",
                      fontSize: 23,
                      marginLeft: 20
                    }}>{name.name + "\n"}<Text style={styles.subheading}>{name.first + " " + name.last}</Text></Text>
                  </TouchableOpacity>
                )
              })
            }
          </Content>


          <Footer>
            <Container style={styles.commentsFooter}>
              <ListItem avatar >
                <Left>
                  <Thumbnail small source={{ uri: this.state.currentProfile.profileImage }} />
                </Left>
              </ListItem>
              <Content>

              </Content>
            </Container>
          </Footer>

        </Container >
      );
    } else {
      return (
        <Container>
          <Text>Loading...</Text>
        </Container>
      );
    }

  }
}

export default withNavigation(LikePage);