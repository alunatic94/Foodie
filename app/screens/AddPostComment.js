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
              <Text style={styles.heading}>Post a Plate</Text>
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
         
            <Text style = {{fontSize:25, fontWeight:"bold", paddingTop: 18, paddingBottom: 25}}>Rate your plate:</Text>
    
         <View style={{ borderWidth: 1, height: 100, alignItems: 'center', justifyContent: 'center', justifyContent:'space-between', paddingTop: 15, paddingBottom: 20 }}>
            <View style={{flexDirection: "row"}}>
              <Button 
                transparent> 
                  <AntDesign name='like2' size={30} style={{padding: 30}}/>
             </Button>

              <Button 
               transparent> 
                  <AntDesign name='meh' size={30} style={{padding: 30}}/>
             </Button>

             <Button 
               transparent> 
                  <AntDesign name='dislike2' size={30} style={{padding: 30}}/>
              </Button>
            </View>
          </View>

            <Text style = {{fontSize:25, fontWeight:"bold", paddingTop: 30, paddingBottom: 15}}>Add a caption:</Text>
          <View style={{borderWidth: 1}}>
            <Input placeholder="Caption" />
            </View>
            
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