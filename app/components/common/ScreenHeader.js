import React, { Component } from 'react';
import { Left, Right, Button, Header, H2, View, Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../../screens/Login.js';
import styles from '../../screens/styles.js';
import { NavigationActions } from 'react-navigation';
export default class ScreenHeader extends Component{
    render(){
        return(
            <Header hasTabs style={styles.screenHeader}>
              <Left>
                {this.props.back ? 
                <Button
                  iconLeft
                  light
                  onPress={() => {
                    this.props.navigation.dispatch(NavigationActions.back())
                  }}
                >
                  <Icon name="arrow-back" />
                </Button>
                :
                <Button 
                     transparent
                     onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                     <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
                </Button>
              }
              </Left>
              <View><H2 style={styles.heading}>{this.props.title}</H2></View>
              <Right>
                <Button 
                  transparent
                  onPress={() => logout(this.props.navigation)}>
                  <AntDesign name='logout' style={{fontSize: 30, color: 'black'}} />
                </Button>
              </Right>
            </Header>
        )
    }
}