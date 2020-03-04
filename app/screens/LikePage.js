import React, { Component } from "react";
import { View, Text, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Button, Container, Header, Left, Footer, Right, ListItem, Thumbnail, Content, Item, Input} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, firebase } from "../database/Database.js";
import {User} from "../database/User.js";
import { withNavigation, ScrollView } from "react-navigation";
//import Comment from "../components/Comment.js";
import styles from '../screens/styles.js';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeButton from '../components/LikeButton.js';
//import { ref } from '@hapi/joi';

class LikePage extends Component {
  liketoinsert=db.collection('posts').doc(this.props.navigation.getParam('postID', 'Qe1PUrFY32K8EYL9UYqW')).collection('Likeby');

  constructor(props) {
    super(props);
    this.state = {
      likesArray: [],
      user: User.dummyUser     
    };
  }

  componentDidMount () {
    this.getall();
    
  }

  getall = () =>{
    
    const allLikes=this.liketoinsert
    .get()
    .then(snapshot => {
      let existingLikes = [];
      snapshot.forEach(doc => {
        existingLikes.push(doc.data());
      });
      this.setState({likesArray: existingLikes});
    })
    

  };



    render() {
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
            <ScrollView>
            {this.state.commentsArray.map((item) => (
              <Text>{item.Userid}</Text>
            ))}
            </ScrollView>
           
                        
              <Footer>
              <Container style={styles.commentsFooter}>
                <ListItem avatar >
                  <Left>
                    <Thumbnail small source={{uri: this.state.user.profileImage}} />
                  </Left>
                </ListItem>            
                  <Content>            
            
                    </Content>            
                </Container>            
              </Footer>
          
          </Container>
        );
      }
    }
    
    export default withNavigation(LikePage);