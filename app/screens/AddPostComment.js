import React, { Component } from 'react';
import { Container, Header, Left, Right, Body, Content, Button, Text, Input, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js';
export default class AddPostComment extends Component {
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
              <Text>Post a Plate</Text>
            </Body>

            <Right>
              <Button 
                transparent
                onPress={() => logout(this.props.navigation)}>
                <AntDesign name='logout' style={{fontSize: 30, color: 'black'}} />
              </Button>
            </Right>
        </Header>

        <Content>
         
            <Text style = {{fontSize:30, fontWeight:"bold"}}>Rate your Plate!</Text>

            <View style={{flexDirection: "row"}}>
              <Button 
                transparent> 
                  <AntDesign name='smile-circle' style={{fontSize: 30}} />
             </Button>

              <Button 
               transparent> 
                  <AntDesign name='smile-circle' style={{fontSize: 30}} />
             </Button>

             <Button 
               transparent> 
                  <AntDesign name='frowno' style={{fontSize: 30}} />
              </Button>
            </View>

            <Text style = {{fontSize:30, fontWeight:"bold"}}>Add a Comment</Text>

            <Input placeholder="Comment" />

            <Button 
            block success 
            onPress={() => this.props.navigation.navigate('Main')}>
                <Text>Post your plate</Text>
            </Button>

        </Content>
      </Container>
    );
  }
}