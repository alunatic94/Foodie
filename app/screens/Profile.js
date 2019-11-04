import React, { Component } from 'react';
import { Container, Text, Left, Right, Icon, Button, Header } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Profile extends Component {
    render() {
        return (
            <Container>
                <Header>
                  <Left>
                    <Button 
                        transparent
                         onPress={() => this.props.navigation.navigate('AddPostPhoto')}> 
                        <AntDesign name='pluscircle' style={{fontSize: 30, color: 'white'}} />
                     </Button>
                  </Left>

                  <Right>
                     <Button transparent>
                         <AntDesign name='logout' style={{fontSize: 30, color: 'white'}} />
                     </Button>
                  </Right>
                </Header>
                <Text> EMPTY PROFILE SCREEN</Text>
            </Container>
        )
    }
}