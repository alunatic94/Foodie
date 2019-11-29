import {firebase, db} from '../database/Database';
import User from './UserDB';

export class PostComment {

    comments = db.collection('posts')
                .doc(postId)//this.props.postsid
                .collection('comments');

    time = new Date();        

    add = (comment) => {
        let commentData = {
            Body: comment,
            comment_ID: 123,
            time: this.time.getTime()
            // user_ID: User.getCurrent()
        }        
        this.comments.doc().set(commentData);        
    }

    getAll = callback => { // TODO: Return all comments
        // After all documents return from the query, you call the callback!
    }
}
