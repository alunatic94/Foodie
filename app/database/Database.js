import * as firebase from 'firebase';
import 'firebase/firestore';

const process = require('dotenv').config();
// Firebase configuration
var firebaseConfig = {
    apiKey: process.env.API_KEY,
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

  var db = firebase.firestore();

  export {
    firebase,
    db
  }