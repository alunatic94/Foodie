import React, { Component } from 'react';
import Comment from './Comment.js';
import {User} from '../../database/User.js'

class Parent extends Component{

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

    replyParent = () => {
        console.log("Reply Parent")
        
    }

    render(){
        return(            
            <Comment padding={0}
            body={this.props.body}
            time={this.props.time}
            userID={this.props.userID}
            handleReplyComment={this.replyParent}
            />
        )
    }
}

export default Parent;