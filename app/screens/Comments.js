import React, { Component } from 'react';
import { Container, Input, Left, Item, Icon, Thumbnail, Button, Header, Footer, Content, ListItem } from 'native-base';
import { withNavigation, ScrollView } from 'react-navigation';
import Comment from '../components/Comment.js';
import { KeyboardAvoidingView, Text } from 'react-native';

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
                <KeyboardAvoidingView style={{flex:1}} behavior="padding">
                <ScrollView>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                </ScrollView>
                <Footer>
                    <ListItem avatar>
                        <Left>
                            <Thumbnail source={{ uri: 'image' }} />
                        </Left>
                    </ListItem>
                    <Container>
                        <Content>
                            <Item rounded>
                                <Input placeholder='Comment'/>
                            </Item>
                        </Content>
                    </Container>
                    <Button transparent>
                        <Text>Post</Text>
                    </Button>
                </Footer>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

export default withNavigation(Comments);

