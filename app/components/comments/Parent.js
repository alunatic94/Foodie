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
        // console.log("In parent: " +  this.props.postID)
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
        return new Promise(resolve => {
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
                    console.log(doc.data())
                });
            })
            .catch(err => {
                console.log(err)
            })
        })        
    }
    
    addChild = (comment)  => {
        let child = comment.update({
            children: "THAT"
        })
    }

    replyParent = async (event) => {        
        console.log("Reply Parent")
        this.props.reply()        
        // let com = await this.getComment()
        // console.log(com)
        // console.log("added")
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
            handleReply={this.replyParent}
            showFooter={this.exitReply}
            />
            {/* <Child/> */}
            </View>
        )
    }
}

export default Parent;