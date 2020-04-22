import React, { Component } from 'react';
import { Pages } from 'react-native-pages';
import { View, Container } from 'native-base';
import ScreenHeader from '../../components/common/ScreenHeader.js'
export default class HelpProfile extends Component {
  render() {
    return (
    <Container>
      <ScreenHeader navigation={this.props.navigation} title="Help Menu" back />
      <Pages horizontal = {false}>
        <View style={{ flex: 1, backgroundColor: 'red' }} />
        <View style={{ flex: 1, backgroundColor: 'green' }} />
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
      </Pages>
    </Container>
    );
  }
}