import React, { Component } from 'react';
import { Pages } from 'react-native-pages';
import { View } from 'native-base';
 
export default class HelpBadge extends Component {
  render() {
    return (
      <Pages horizontal = {false}>
        <View style={{ flex: 1, backgroundColor: 'red' }} />
        <View style={{ flex: 1, backgroundColor: 'green' }} />
        <View style={{ flex: 1, backgroundColor: 'blue' }} />
      </Pages>
    );
  }
}