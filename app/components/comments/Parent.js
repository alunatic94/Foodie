import React, { Component, Children } from 'react';
import Comment from './Comment.js';
import {User} from '../../database/User.js'
import {db} from '../../database/Database.js'
import Moment from 'moment';
import Child from './Child.js';
import { CheckBox, View } from 'native-base';
class Parent extends Component {

    time = Moment().format('LT');

    constructor(props){
        super(props)
        this.state = {
            user: User.dummyUser,
            child: "Testing child",
            children: []
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

    getComment = async () => {        
            comment = db
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
                snapshot.forEach(doc => {
                    console.log("Heres doc data")
                    // console.log(doc.data())
                    return doc.data();
                });                
            })
            .catch(err => {
                console.log(err)
        })
    }         

    replyParent = (event) => {        
        console.log("Reply Parent")
        let parentComment =  this.getComment()        
        console.log(parentComment)
        // let data = parentComment.set({
        //     children: "Testing update"
        // }, {merge: true});
        // console.log("added")
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
                    inputBox={this.handleInputBox}
                    showFooter={this.exitReply}
                    handleReply={this.replyParent}
                />
                {this.state.children.map((comment, index)=>
                    (<Child
                        key={index}
                        body={comment.body}
                        time={comment.time}
                        userID={comment.userID}
                        postID={comment.postID}
                        inputBox={this.handleInputBox}
                        showFooter={this.exitReply}
                    />))}
            </View>
        )
    }
}

export default Parent;