import {firebase, db} from 'Database';

export class User {
  static users = db.collection('users');

  // Create new User instance either from:
  // 1) User(uid) - existing user
  // 2) User(uid, username...) - create a new user
  constructor(uid=null, username=null, first=null, last=null, age=null, email=null) {
    let existingUserData = null;
    if (users.doc(uid) != null) { // exists already
      existingUserData = _getData(uid);
    }
    // Create from existing data if available, else use new parameters
    this.username = existingUserData.username || username;
    this.uid = existingUserdata.uid || uid;
    this.first = existingUserData.first || first;
    this.last = existingUserData.last || last;
    this.age = existingUserData.age || age;
    this.email = existingUserData.email || email;
  }

  static getCurrent(uid=null) {
    if (firebase.auth().currentUser !== null) { // logged in
        let data = _getData(firebase.auth().currentUser.uid);
        return new User(data.uid, data.username, data.first, data.last, data.age, data.email);
    }
    return null; // no current user found
  }

  static _getData(uid) {
    var userData = {};
    users.doc(uid).get().then((doc) => {
      userData = doc.data();
      update(userData);
      return userData;
    })
    .catch((err) => {
      console.log("Could not find user from Id '" + uid);
    });
  }

  get() {
    return _getData(this.uid);
  }

  // Add user to database
  add() {
    let userData = {
      uid: this.uid,
      username: this.username,
      first: this.first,
      last: this.last,
      age: this.age,
      email: this.email
    };
    users.doc(this.uid).set(userData)
    .then((doc) => {
      return doc.id;
    })
    .catch((err) => {
      console.log("Could not create user given: \n" + userData);
    });
  }

  static getAll() {
    var allUsers = {};
    users.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      allUsers[doc.id] = doc.data();
      });
    console.log(allUsers);
    return allUsers;
    })
    .catch((err) => {
      console.log('Error getting users', err);
    });
  }

  update(userData) {
    this.uid = userData.uid;
    this.username = userData.username;
    this.first = userData.first;
    this.last = userData.last;
    this.email = userData.email;
    this.age = userData.age;
  }
}


/*class ServerHandler {

    // POST user registration info to Firebase 'users' collection
    addNewUserData(userId, first, last, age, email) {
        fetch('http://siguenza.net/foodie/api/users', {  
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
              firstName: first,
              lastName: last,
              age: age,
              email: email
            })
          })
          .then((res) => {
              console.log("Created new user in database with ID = " + res);
              return JSON.parse(res);
          })
          .catch((error) => console.log("Could not create user in database"));
    }
  }
  const serverHandler = new ServerHandler();
  export default serverHandler;*/
