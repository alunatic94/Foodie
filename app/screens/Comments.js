import React, { Component } from 'react';
import { Container, Input, Left, Item, Icon, Thumbnail, Button, Header, Footer, Content, ListItem } from 'native-base';
import { withNavigation, ScrollView } from 'react-navigation';
import Comment from '../components/Comment.js';
import { KeyboardAvoidingView, Text, Alert } from 'react-native';
import {firebase, db} from '../database/Database';

class Comments extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment: ''
        }        
    }
        
    // TODO:
    handleSubmit = (event) => {
        event.preventDefault();
        // alert("waog")

        comments = db.collection('comments');

        let commentData = {
            body: this.state.comment
        };

        comments.doc().set(commentData)
        .then((doc) => {
            return doc.id;
        })
        .catch((err) => {
            console.log("Could not upload comment");
        })
    }

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
                    {/* Must up slack comments dynamically  */}
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
                                <Input
                                placeholder='Comment'
                                onChangeText={(comment) => this.setState({comment})}
                                value={this.state.comment}
                                />
                            </Item>
                        </Content>
                    </Container>
                    <Button transparent
                    onPress={this.handleSubmit}>
                        <Text>Post</Text>
                    </Button>
                </Footer>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

export default withNavigation(Comments);

