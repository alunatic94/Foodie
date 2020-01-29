import React, { Component } from 'react';
import { Left, Right, Button, Header } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../../screens/Login.js';
export default class ScreenHeader extends Component{
    render(){
        return(
            <Header>
              <Left>
                <Button 
                     transparent
                     onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                     <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
                </Button>
              </Left>
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