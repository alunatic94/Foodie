import React, { Component, Children } from 'react';
import Comment from './Comment.js';
import {User} from '../../database/User.js'
import {db} from '../../database/Database.js'
import Moment from 'moment';
class Parent extends Component {

    time = Moment().format('LT');
    comment = db
        .collection("posts")
        .doc(this.props.userID)
        .collection("comments")
        .where('body', '==', this.props.body)


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

    replyParent = () => {
        console.log("Reply Parent")
        // console.log(this.comment)
        // this.addChild()
        console.log("added")
    }

    addChild = (comment) => {
        let child = this.comment.update({
            children: "THAT"
        })
    }

    render(){
        return(
            <Comment padding={0}
            body={this.props.body}
            time={this.props.time}
            userID={this.props.userID}
            handleReply={()=> this.replyParent()}
            />
        )
    }
}

export default Parent;