import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import FeedCard from '../components/FeedCard.js';
import { ScrollView } from 'react-native';
import { db } from '../database/Database.js';
import ScreenHeader from '../components/common/ScreenHeader.js';
import PostCardPlaceholder  from '../components/placeholders/PostCardPlaceholder.js';
import styles from './styles.js';

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
      .orderBy('timestamp', 'desc')
      .get()
      .then(snapshot => {
        let existingPosts = [];
        snapshot.forEach(doc => {
          post = {
            postID: doc.id,
            data: doc.data()
          }
          existingPosts.push(post);
        });
        this.setState({posts: existingPosts});
      })
      .catch(err => {
        console.log("Error getting existing posts " + err);
      });
  }

    render() {
      if (this.state.posts.length == 0) {
        return (
        <Container>
          <ScreenHeader navigation = {this.props.navigation} title="Feed"/>
          <Content>
            <PostCardPlaceholder style={styles.roundCard} />
            <PostCardPlaceholder style={styles.roundCard} />
            <PostCardPlaceholder style={styles.roundCard}/>
          </Content>
        </Container>
        )
      }
      else {
        return (
          <Container>    
            
                <ScreenHeader navigation = {this.props.navigation} title="Feed">
                </ScreenHeader>

                <Content>        
                  <ScrollView/>
                  {this.state.posts.map((post) => <FeedCard key={post.postID} postID={post.postID} post={post.data}/>)}        
                <ScrollView/>       
                </Content>
          </Container> 
        )
    }
  }
}