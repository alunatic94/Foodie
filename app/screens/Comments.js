import React, { Component } from 'react';
import { Container, Input, Left, Item, Icon, Thumbnail, Button, Header, Footer, Content, ListItem } from 'native-base';
import { withNavigation, ScrollView } from 'react-navigation';
import Comment from '../components/Comment.js';
import { KeyboardAvoidingView, Text } from 'react-native';

class Comments extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment: ''
        }

        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    handleCommentChange(comment) {
        this.setState({comment});
    }
    // TODO:
    handleSubmit(comment){
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
                                onChangeText={(comment) => this.handleCommentChange(comment)}
                                />
                            </Item>
                        </Content>
                    </Container>
                    <Button transparent
                    onPress={(comment) => this.handleSubmit(comment)}>
                        <Text>Post</Text>
                    </Button>
                </Footer>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

export default withNavigation(Comments);

