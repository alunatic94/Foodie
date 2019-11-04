import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button } from 'native-base';
import styles from './styles.js';
import { StyleSheet, View, TextInput, Image, FlatList } from 'react-native';
import MainHeader from './Header.js';

export default class Feed extends Component {
    render() {
        return (
	<Container>
    
    <MainHeader>
    </MainHeader>
    
        <Content>
          <Card>
            <CardItem>
              <Left>
               <Thumbnail source={require('./assets/dog.png')} />
                <Body>
                 <Text>Foodie</Text>
                  <Text note>Location CSUN</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
          <Image source = {require('./assets/howlin.png')} style={{height: 200, width: null, flex: 1}} />
            </CardItem>
            <CardItem>
              <Left>
               
					 <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                 
                
              </Left>
              <Body>
                
                <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        
          <Card>
            <CardItem>
              <Left>
               <Thumbnail source={require('./assets/dog.png')} />
                <Body>
                 <Text>Foodie</Text>
                  <Text note>Location CSUN</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
          <Image source = {require('./assets/howlin.png')} style={{height: 200, width: null, flex: 1}} />
            </CardItem>
            <CardItem>
              <Left>
               
					 <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                 
                
              </Left>
              <Body>
                
                <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
       
          <Card>
            <CardItem>
              <Left>
               <Thumbnail source={require('./assets/dog.png')} />
                <Body>
                 <Text>Foodie</Text>
                  <Text note>Location CSUN</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
          <Image source = {require('./assets/howlin.png')} style={{height: 200, width: null, flex: 1}} />
            </CardItem>
            <CardItem>
              <Left>
               
					 <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                 
                
              </Left>
              <Body>
                
                <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
       
          <Card>
            <CardItem>
              <Left>
               <Thumbnail source={require('./assets/dog.png')} />
                <Body>
                 <Text>Foodie</Text>
                  <Text note>Location CSUN</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
          <Image source = {require('./assets/howlin.png')} style={{height: 200, width: null, flex: 1}} />
            </CardItem>
            <CardItem>
              <Left>
               
					 <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                 
                
              </Left>
              <Body>
                
                <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
        )
    }
}