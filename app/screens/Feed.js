import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js';
import FeedCard from '../components/FeedCard.js';
import styles from './styles.js';
import PostCard from '../components/PostCard.js';

export default class Feed extends Component {
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
              <Text style={styles.heading}>Your Feed</Text>
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
        {/* TODO: Dynamically load post ids from collection to create Feedcard for each one */}
         <FeedCard postID="Qe1PUrFY32K8EYL9UYqW"/>
         <FeedCard postID="aDpWMJ1UfX7U2rdbvXtR"/>
        </Content>
      </Container>
        )
    }
}