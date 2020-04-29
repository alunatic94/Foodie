import React, { Component } from 'react';
import { db } from '../../database/Database';
import Plates  from './Plates';
import TitleAndImagesPlaceholder  from '../placeholders/TitleAndImagesPlaceholder';


export default class LikedPlates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plates: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getPlatesFromLikes();
        this.addPostsListener();
            
    }

    componentWillUnmount(){
        this.removePostsListener();
    }

    // Firebase structure is:
    //      Posts
    //          --| Likeby
    //                  --| docID (userID)
    // likedByUser grabs the userID documents of ALL likeby subcollections of ALL posts
    // To get the corresponding post for each document, we need to get the parent Likeby subcollection, THEN parent post doc
    
    likedByUser = db.collectionGroup("Likeby")
        .where("userID", "==", this.props.userID)
        .orderBy("timestamp", "desc")
        .limit(10);
        
    removePostsListener() {
        this.likedByUser.onSnapshot(() => {});
    }

    addPostsListener() {
        this.likedByUser.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                parentPostDoc = change.doc.ref.parent.parent;
                parentPostDoc.get().then((doc) => {
                    parentPost = doc.data();
                    if (change.type === "added") {
                        var i = this.state.plates.findIndex(x => x.id == parentPost.id);
                        if (i == -1) {
                            plates = this.state.plates;
                            plates.unshift(parentPost);
                            this.setState({plates});
                        }
                    }
                    if (change.type === "modified") {
                        var i = this.state.plates.findIndex(x => x.id == parentPost.id);
                        plates = this.state.plates;
                        plates[i] = parentPost;
                        this.setState({plates});
                    }
                    if (change.type === "removed") {
                        plates = this.state.plates;
                        var i = plates.indexOf(parentPost);
                        plates.splice(i, 1);
                        this.setState({plates});
                    }
                });
            });
        });
    }

    getPlatesFromLikes(user) {
        let plates = [];
        this.likedByUser.get().then(snapshot => {
            snapshot.forEach(doc => {
                parentPostDoc = doc.ref.parent.parent;
                parentPostDoc.get().then((doc) => {
                    parentPost = doc.data();
                    var i = this.state.plates.findIndex(x => x.id == parentPost.id);
                    if (i == -1) plates.push(parentPost);
                });
            });
            this.setState({plates: plates, isLoaded: true});
        })
        .catch(err => {
            console.log("Error getting recently liked posts [user id = " + this.props.userID + "]: " + err);
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <TitleAndImagesPlaceholder small title="Recently Liked Plates"/>
        }
        else return (
            <Plates small heading="Recently Liked Plates" data={this.state.plates} onPress={this.props.onPress} /> 
        )
    }
}