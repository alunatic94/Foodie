import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Right, Body, Content, Button, Text, Input, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from '../screens/Login.js'; 
import styles from './styles.js';
import { db } from '../database/Database.js';
import { UserDB } from '../database/UserDB.js';

export default class AddPostComment extends Component {

  // User = User._getData('DveCC8D0yeaKDmHFn5Nh0tiGFoE3');
  posts = db.collection("posts");
  photos = this.props.navigation.getParam('uri');  

  constructor(props) {
    super(props);
    this.state = {
        like: false,
        meh: false,
        dislike: false
    };
  }

  componentDidMount() {
    const { like, meh, dislike } = this.props;
    this.setState({ like, meh, dislike });
    console.log("Before call to UserDB");
    userID = UserDB.getCurrent();
    
}

addPost(){
  let postData = {
    images: [this.photos],
    likes: 0,
    rating: 2,    
    // TODO:
    // user.getCurrentID()
    // comments collection
    // likes_who
    // 
  }
  this.posts.doc().set(postData);
  // comments = this.posts.doc().collection('comments');
  // this.posts.doc().set(comments);
}

  render() {
    const { like, meh, dislike } = this.state;
    const { navigation } = this.props;
    const uri = navigation.getParam('uri');        
    
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
                  <AntDesign name={like ? 'like1' : 'like2'} color={like ? 'green' : 'rgb(50, 50, 50)'} size={30} style={{padding: 30}} onPress={() => this.setState({ like : !like })}/>
             </Button>

              <Button 
               transparent> 
                  <AntDesign name={meh ? 'meho' : 'meh'} color={meh ? 'grey' : 'rgb(50, 50, 50)'}  size={30} style={{padding: 30}} onPress={() => this.setState({ meh : !meh })}/>
             </Button>

             <Button 
               transparent> 
                  <AntDesign name={dislike ? 'dislike1' : 'dislike2'} color={dislike ? 'red' : 'rgb(50, 50, 50)'} size={30} style={{padding: 30}} onPress={() => this.setState({ dislike : !dislike })}/>
              </Button>
            </View>
          </View> 
            <Image  style={{width: 400, height: 400}} source={{uri:uri}}/>
            <Text style = {{fontSize:25, fontWeight:"bold", paddingTop: 30, paddingBottom: 15}}>Add a caption:</Text>
          <View style={{borderWidth: 1}}>
            <Input placeholder="Caption" />
            </View>
            
            <Button
            block success 
            onPress={() => this.addPost()}>
                <Text>Post your plate</Text>
            </Button>

        </Content>
      </Container>
    );
  }
}