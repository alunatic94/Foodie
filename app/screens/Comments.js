import React, { Component } from 'react';
import { Container, Content, Card, CardItem, List, ListItem, Body, Text, Left, Right, Icon, Thumbnail, Button, Header } from 'native-base';
import { withNavigation } from 'react-navigation';
import Comment from '../components/Comment.js';

class Comments extends Component{

    render(){
        return(
            <Container>
                <Header>
                    <Left>
                    <Button iconLeft light onPress= {()=> {this.props.navigation.goBack();}}>
                    <Icon name='arrow-back'/>                    
                    </Button>
                    </Left>
                </Header>
                <Comment/>
                <Comment/>
                <Comment/>    
            </Container>
        );
    }
}

export default withNavigation(Comments);

