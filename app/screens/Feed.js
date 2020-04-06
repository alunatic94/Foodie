import React, { Component } from 'react';
import { Container, Content, Segment, Button, Text, View, Tab, Tabs } from 'native-base';
import FeedCard from '../components/FeedCard.js';
import { ScrollView } from 'react-native';
import { db } from '../database/Database.js';
import ScreenHeader from '../components/common/ScreenHeader.js'
import { User } from "../database/User.js"
import styles from './styles.js';
import FriendPlates from '../components/Profile/FriendPlates.js';
import LocalFeed from './LocalFeed.js';
import FriendsFeed from './FriendsFeed.js';

export default class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.navigation.getParam('userID', User.getCurrentUserID())
    }
  }

  render() {
    return (
      <Container>

        <ScreenHeader navigation={this.props.navigation} title="Feed">
        </ScreenHeader>

        <Tabs tabBarUnderlineStyle={{backgroundColor: "#6fdedc"}}>
          <Tab heading="Local" activeTextStyle={{color: "#6fdedc"}}>
            <LocalFeed />
          </Tab>
          <Tab heading="Friends"activeTextStyle={{color: "#6fdedc"}}>
            <FriendsFeed
              userID={this.state.userID}
            />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}