import React, { Component, Children } from 'react';
import Comment from './Comment.js';
import {User} from '../../database/User.js'
import {db} from '../../database/Database.js'
import Moment from 'moment';
class Parent extends Component {

    time = Moment().format('LT');

    // comment = db
    //     .collection("posts")
    //     .doc(this.props.userID)
    //     .collection("comments")
    //     .where('body', '==', this.props.body)
    //     .get()
    //     .then(snapshot => {
    //          if(snapshot.empty){
    //              console.log("WTF")
    //          }
    //          snapshot.forEach(doc => {
    //              console.log("Heres doc data")
    //              console.log(doc.id)
    //          });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });


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
        console.log(this.props.userID)
        console.log(this.props.postID)
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

    getComment = () => {
        return new Promise(resolve => {
            comment = db
            .collection("posts")
            .doc(this.props.navigation.getParam('postID')
            .collection("comments")
            .where('body', '==', this.props.body)
            .get()
            .then(snapshot => {
                 if(snapshot.empty){
                     console.log("WTF")
                     return;
                 }
                 snapshot.query(doc => {
                     console.log("Heres doc data")
                     console.log(doc.id)
                 });
            })
            .catch(err => {
                console.log(err)
            });
        })
    }
    

    replyParent = async => {
        console.log("Reply Parent")
        
        c = this.getComment()
        console.log(c)
        // this.addChild()
        console.log("added")
    }

    addChild = (comment) => {        

        let child = comment.update({
            children: "THAT"
        })
    }

    render(){
        return(
            <Comment padding={0}
            body={this.props.body}
            time={this.props.time}
            userID={this.props.userID}
            handleReply={this.replyParent}
            />
        )
    }
}

export default Parent;