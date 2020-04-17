import React, { Component } from 'react';
import Comment from './Comment.js';
import {User} from '../../database/User.js'
import {db} from '../../database/Database.js'
import Moment from 'moment';
import Child from './Child.js';
import { View } from 'native-base';
class Parent extends Component {

    time = Moment().format('LT');

    constructor(props){
        super(props)
        this.state = {
            user: User.dummyUser
        }
    }

    componentWillMount(){
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

    replyParent = async (childComment, userThatReplied) => {

        let currentChildren = this.props.children
        let sendToFireStore = []
        if(currentChildren == null){
            console.log(currentChildren == null)
            let initChild = {childComment, userThatReplied}
            sendToFireStore.push(initChild)
        }else{
            console.log("currentChildren in else: " , currentChildren)
            let addChild = {childComment, userThatReplied}
            sendToFireStore = currentChildren.reverse()
            sendToFireStore.push(addChild)
            console.log("got to else")
        }        
        
        console.log("Reply Parent")        
        let parentComment =   await db
            .collection("posts")
            .doc(this.props.postID)
            .collection("comments")
            .where('body', '==', this.props.body)
            .get()
            .then(snapshot => {
                if(snapshot.empty){ 
                    console.log("Empty")
                    return;
                }
                snapshot.forEach((document) => {
                    document.ref.set({
                        children: sendToFireStore,
                        hasChildren: true
                    }, {merge: true})
                    console.log("Uploaded to FireStore...")
                });
            })
            .catch(err => {
                console.log(err)
        })
    }

    handleInputBox = () => {
        this.props.hideInput()
    }

    exitReply = () => {
        this.props.exit()
    }

    render(){
        return(
            <View>
                <Comment padding={0}
                    body={this.props.body}
                    time={this.props.time}
                    userID={this.props.userID}
                    postID={this.props.postID}
                    inputBox={this.handleInputBox}
                    showFooter={this.exitReply}
                    handleReply={this.replyParent}
                />
                
                {this.props.children && this.props.children.map((comment, index) =>
                    (<Child
                        key={index}
                        body={comment.childComment}
                        time={this.props.time} //TODO: Structure time
                        userID={comment.userThatReplied}
                        postID={this.props.postID}
                        inputBox={this.handleInputBox}
                        showFooter={this.exitReply}
                    />))}
            </View>
        )
    }
}

export default Parent;