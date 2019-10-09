import * as firebase from 'firebase';

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCNHeytbvzoP3cvbfFcIYV2VmGojOjNyp4",
    authDomain: "foodie-hotspots.firebaseapp.com",
    databaseURL: "https://foodie-hotspots.firebaseio.com",
    projectId: "foodie-hotspots",
    storageBucket: "foodie-hotspots.appspot.com",
    messagingSenderId: "187152018518",
    appId: "1:187152018518:web:d91e07b525b894a7f71ff7",
    measurementId: "G-J2MX2TG545"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;