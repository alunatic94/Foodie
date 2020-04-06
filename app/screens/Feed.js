import React, { Component } from 'react';
import { Container, Content, Segment, Button, Text,View } from 'native-base';
import FeedCard from '../components/FeedCard.js';
import { ScrollView } from 'react-native';
import { db } from '../database/Database.js';
import ScreenHeader from '../components/common/ScreenHeader.js';
import PostCardPlaceholder  from '../components/placeholders/PostCardPlaceholder.js';
import { User } from "../database/User.js"
import styles from './styles.js';

export default class Feed extends Component {

  posts = db.collection('posts');
  friends = db.collection('friends');
  users = db.collection('users');

  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.navigation.getParam('userID', User.getCurrentUserID()),
      isLoaded: false,
      plateID: [],
      posts: []
    }
  }

  async componentDidMount() {
    this.getAll();
    
  }

  async getPlateID(user) {
    let plates = []
    const ret = await this.users
      .doc(user)
      .get()
      .then(res => {
        let data = res.data().plates
        plates = res.data().plates
        var temp = this.state.plateID.concat(data)
        this.setState({ plateID: temp })
      })
    return plates
  }

  async getPost(id) {
    const ret = await this.posts
      .doc(id)
      .get()
      .then(doc => {
        post = {
          postID: doc.id,
          data: doc.data()
        }
        if (post.data != undefined) {
          var temp = this.state.posts
          temp.push(post)
          temp.sort(this.compare)
          this.setState({ posts: temp })
        }
      })
    return ret
  }

  compare(a, b) {
    const postone = a.data.timestamp
    const posttwo = b.data.timestamp


    let comparison = 0
    if (postone > posttwo) {
      comparison = 1
    } else if (postone < posttwo) {
      comparison = -1
    }
    return comparison * -1
  }

  componentWillUnmount() {
    const unMountListener = this.posts.onSnapshot(() => { });
  }

  async getAll() {
    var friendslist = []
    await this.friends
      .doc(this.state.userID)
      .get()
      .then(friends => {
        let data = friends.data()
        Object.keys(data).forEach(userID => {
          if (data[userID]) {
            friendslist.push(userID)
          }
        })
      })
    var friendsplates = []
    await friendslist.forEach(item => {
      this.getPlateID(item).then(ret => {
        ret.forEach(id => {
          this.getPost(id).then(() => {
            this.setState({ isLoaded: true })
          })
        })
      })
    })
  }

    render() {
      if (!this.state.isLoaded) {
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

                <Segment>
                <Button first active onPress = {() => this.props.navigation.navigate('LocalFeed')}>
                  <Text>Local</Text>
                </Button>
                <Button last active onPress = {() => this.props.navigation.navigate('FriendFeed')}> 
                  <Text>Friend</Text>
                </Button>
              </Segment>


                <Content>        
                  <ScrollView>
                  {this.state.posts.map((post) => <FeedCard key={post.postID} postID={post.postID} post={post.data}/>)}        
                </ScrollView>       
                </Content>
          </Container> 
        )
      }
    }
}