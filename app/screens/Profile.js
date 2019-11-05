import React, { Component } from 'react';
import { Container, Text, Left, Body, Right, Button, Header } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js';


export default class Profile extends Component {
    render() {
        return (
            <Container>
                <Header>
                  <Left>
                    <Button 
                        transparent
                         onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                        <AntDesign name='pluscircle' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Left>
                  
                  <Body>
              <Text>Your Profile</Text>
            </Body>

                  <Right>
                    <Button 
                        transparent
                        onPress={() => logout(this.props.navigation)}>
                         <AntDesign name='logout' style={{fontSize: 30, color: 'black'}} />
                     </Button>
                  </Right>
                </Header>
                <Text> EMPTY PROFILE SCREEN</Text>
            </Container>
        )
    }
}