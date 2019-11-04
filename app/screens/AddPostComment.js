import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Input, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class AddPostComment extends Component {
  render() {
    return (
      <Container>
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