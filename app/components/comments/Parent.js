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
        console.log("Printing profileImage")
        // console.log(this.state.user.profileImage)
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

    render(){
        return(            
            <Comment padding={0}
            body={this.props.body}
            time={this.props.time}
            userID={this.state.user.userID}
            profileImage={this.state.user.profileImage}
            />
        )
    }
}

export default Parent;