import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js';
import FeedCard from '../components/FeedCard.js';
import styles from './styles.js';
import { ScrollView } from 'react-native';
import { db } from '../database/Database.js';

export default class Feed extends Component {

  posts = db.collection('posts');

  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    this.getAll();
    const query = this.posts
    const listener = query.onSnapshot(querySnapshot => {
      this.getAll();
    }, err => {
      console.log("Encountered error: ${err}");
    });
  }

  componentWillUnmount(){
    const unMountListener = this.posts.onSnapshot(() => {});
  }

  getAll(){
    const allPosts = this.posts
      .get()
      .then(snapshot => {
        let existingPosts = [];
        snapshot.forEach(doc => {
          console.log(doc.data());
          existingPosts.push(doc.data());
        });
        this.setState({posts: existingPosts});
      })
      .catch(err => {
        console.log("Error getting existing posts " + err);
      });
  }

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
              <Text style={styles.heading}>Your Feed</Text>
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
          <ScrollView/>
          {this.state.posts.map(() => (<FeedCard/>))}        
         <ScrollView/>       
        </Content>
      </Container>
        )
    }
}