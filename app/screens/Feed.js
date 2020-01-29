import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import FeedCard from '../components/FeedCard.js';
import { ScrollView } from 'react-native';
import { db } from '../database/Database.js';
import ScreenHeader from '../components/common/ScreenHeader.js'

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
          console.log(doc.data());
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
        return (
	<Container>    
    
        <ScreenHeader navigation = {this.props.navigation}>
        </ScreenHeader>

        <Content>
        {/* TODO: Dynamically load post ids from collection to create Feedcard for each one */}
         {/* <FeedCard postID="Qe1PUrFY32K8EYL9UYqW"/>
         <FeedCard postID="aDpWMJ1UfX7U2rdbvXtR"/> */}
          <ScrollView/>
          {this.state.posts.map((post) => <FeedCard key={post.postID} postID={post.postID}/>)}        
         <ScrollView/>       
        </Content>
      </Container> 
        )
    }
}