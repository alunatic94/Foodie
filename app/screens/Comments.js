import React, { Component } from 'react';
import { Container, Input, Left, Item, Icon, Thumbnail, Button, Header, Footer, Content, ListItem } from 'native-base';
import { withNavigation, ScrollView } from 'react-navigation';
import Comment from '../components/Comment.js';
import { KeyboardAvoidingView, Text, Alert } from 'react-native';
import { PostComment } from '../database/PostComment.js';
import { firebase, db } from '../database/Database.js';;


class Comments extends Component{

    comments = db.collection('posts')
                .doc('Qe1PUrFY32K8EYL9UYqW')//this.props.postsid
                .collection('comments');
    
    time = new Date();

    constructor(props){
        super(props);
        this.state = {
            comment: '',
            comments: []
        }        
    }
    // TODO:
    // establish database listener set comments array in listener
    // seed comments array
    componentDidMount(){
            // 
    }
    componentWillUnmount(){        
        // remove database listener
    }
        
    // TODO:
    handleSubmit = (event) => {
        event.preventDefault();
        this.add(this.state.comment);
        this.setState({
            comment: ''
        });
    }

    add = (comment) => {
        let commentData = {
            Body: comment,
            comment_ID: 123,
            time: this.time.getTime()
            // user_ID: User.getCurrent()
        }        
        this.comments.doc().set(commentData);        
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
                {this.state.comments.map(comment => <Comment body={comment} />)}
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

