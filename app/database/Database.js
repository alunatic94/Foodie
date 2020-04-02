import * as firebase from 'firebase';
import 'firebase/firestore';

  var db = firebase.firestore();

  export {
    firebase,
    db
  }