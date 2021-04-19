import React, { Component } from 'react';
import { Container, Content, Segment, Button, Text, View, Tab, Tabs } from 'native-base';
import ScreenHeader from '../components/common/ScreenHeader.js';
import { User } from "../database/User.js"
import LocalFeed from './LocalFeed.js';
import FriendsFeed from './FriendsFeed.js';
import {AquaMain} from '../styles/global.js'

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

        <Tabs tabBarUnderlineStyle={{backgroundColor: AquaMain}}>
          <Tab heading="Local" activeTextStyle={{color: AquaMain}}>
            <LocalFeed />
          </Tab>
          <Tab heading="Friends"activeTextStyle={{color: AquaMain}}>
            <FriendsFeed
              userID={this.state.userID}
            />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}