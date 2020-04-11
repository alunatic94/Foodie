import React, { Component } from 'react';
import {User} from '../../database/User.js'
import Comment from './Comment.js';


// const tempImage = require('../screens/assets/dog.png');

class Child extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: User.dummyUser
    }
  }

  componentWillMount() {
    this.loadUser();
 }

 loadUser = () => {
     User.getExisting(this.props.userID).then((loadedUser) => {
         this.setState({
             user: loadedUser
         })
     })
     .catch((err) => {
         console.log(err + ":" + "Could not load user [id = " + this.props.userID + "] for comment");
     })
 }

  replyChild = () => {    
    console.log('Reply child')
  }  

    render(){
        return(
          <Comment padding={45}
                  body={this.props.body}
                  time={this.props.time}
                  userID={this.props.userID}
                  postID={this.props.postID}
                  inputBox={this.props.inputBox}
                  showFooter={this.props.showFooter}
          />
        )}
}
export default Child;