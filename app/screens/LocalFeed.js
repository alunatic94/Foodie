import React, { Component } from 'react';
/* import { Text } from 'react-native' */
import { Container, Content, Segment, Button, Text, View } from 'native-base';
import FeedCard from '../components/FeedCard.js';
import { ScrollView } from 'react-native';
import { db } from '../database/Database.js';
import geohash from 'ngeohash'
import styles from './styles.js'

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
      const range = this.getGeoRange(position.coords.latitude, position.coords.longitude, 5);
      this.posts
        .where("geohash", ">=", range.lower)
        .where("geohash", "<=", range.upper)
        .onSnapshot(snapshot => {
          let existingPosts = [];
          snapshot.forEach(doc => {
            post = {
              postID: doc.id,
              data: doc.data()
            }
            existingPosts.push(post);
          });
          this.setState({ posts: existingPosts, isLoaded: true});
        })
    },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 2000 })
  }

  componentWillUnmount() {
    const unMountListener = this.posts.onSnapshot(() => { });
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
    if (!this.state.isLoaded) {
      return (
        <Container>
          <View style={styles.centeredTest}>
            <Text>Loading!</Text>
          </View>
        </Container>
      )
    }
    return (
      <Container>
        <Content>
          {/* TODO: Dynamically load post ids from collection to create Feedcard for each one */}
          {/* <FeedCard postID="Qe1PUrFY32K8EYL9UYqW"/>
         <FeedCard postID="aDpWMJ1UfX7U2rdbvXtR"/> */}
          <ScrollView />
          {this.state.posts.map((post) => <FeedCard key={post.postID} postID={post.postID} />)}
          <ScrollView />
        </Content>
      </Container>
    )
  }
}