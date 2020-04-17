import React, { Component, Children } from 'react';
import {User} from '../../database/User.js'
import Comment from './Comment.js';
import { db } from '../../database/Database.js'
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

  replyChild = async (comment, userThatReplied) => {    
    console.log('Reply child')
    let childComment =   await db
            .collection("posts")
            .doc(this.props.postID)
            .collection("comments")
            .where("hasChildren", "==", true)
            .where("body", "==", this.props.parentBody) //Potential bugs with same comment emojis
            .get()
            .then((snapShot) => {
              snapShot.forEach(()=> {
                this.props.handleForMeBig(comment, userThatReplied)
              })
            })
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
                  handleReply={this.replyChild}
          />
        )}
}
export default Child;