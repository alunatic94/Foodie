import {firebase, db} from '../database/Database';
import User from './UserDB';

class PostComment {

    comments = db.collection('posts')
                .doc('Qe1PUrFY32K8EYL9UYqW')
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
}

export { PostComment };
