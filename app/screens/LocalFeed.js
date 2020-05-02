import React, { Component } from 'react';
/* import { Text } from 'react-native' */
import { Container, Content, Segment, Button, Text, View } from 'native-base';
import FeedCard from '../components/FeedCard.js';
import { ScrollView } from 'react-native';
import { db } from '../database/Database';
import geohash from 'ngeohash'
import PostCardPlaceholder  from '../components/placeholders/PostCardPlaceholder.js';

export default class LocalFeed extends Component {

  posts = db.collection('posts');

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      latitude: '',
      longitude: '',
      isLoaded: false
    }
  }
  

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(position => {
      let range = this.getGeoRange(position.coords.latitude, position.coords.longitude, 5);
      // this.getPosts(range);
      this.setState({isLoaded: true});
      this.addPostsListener(range);
    },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 2000 })
  }

  componentWillUnmount() {
    const unMountListener = this.posts.onSnapshot(() => { });
  }

  addPostsListener(range) {
    this.posts.where("geohash", ">=", range.lower)
    .where("geohash", "<=", range.upper).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          posts = this.state.posts;
          post = {postID: change.doc.id, data: change.doc.data()};
            if (change.type === "added") {
              posts.unshift(post);
            }
            if (change.type === "modified") {
                var i = posts.findIndex(x => x.data.id == post.data.id);
                posts[i] = post;
            }
            if (change.type === "removed") {
                var i = posts.indexOf(post);
                posts.splice(i, 1);
            }
            posts.sort(this.compare);
            this.setState({posts});
        });
    });
  }

  compare(a, b) {
      const postone = a.data.timestamp
      const posttwo = b.data.timestamp

      return (postone > posttwo ? -1 : 1);
  }

  getGeoRange(latitude, longitude, distance) {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;
    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;

    const lower = geohash.encode(lowerLat, lowerLon, precision = 9);
    const upper = geohash.encode(upperLat, upperLon, precision = 9);

    return {
      lower,
      upper
    }

  }

  render() {
    if (!this.state.isLoaded || this.state.posts.length < 1) {
      return (
        <Container>
          <Content style={{backgroundColor: 'whitesmoke', padding: 5}}>
            <PostCardPlaceholder/>
            <PostCardPlaceholder/>
            <PostCardPlaceholder/>
          </Content>
        </Container>
      )
    }
    else return (
      <Container>
        <Content style={{backgroundColor: 'whitesmoke', padding: 5}}>
          <ScrollView>
          {this.state.posts.map((post) => <FeedCard key={post.postID} postID={post.postID} post={post.data}/>)}
          </ScrollView>
        </Content>
      </Container>
    )
  }
}