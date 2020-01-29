import {firebase, db} from '../database/Database';

users = db.collection('users');

export class UserDB {

  // Create new User instance either from:
  // 1) UserDB(userID) - existing user
  // 2) UserDB(userID, username...) - create a new user
  constructor(userID=null, username=null, first=null, last=null, age=null, email=null) {
    let existingUserData = null;
    if (users.doc(userID).exists) { // exists already - async update
      existingUserData = UserDB._getData(userID);
    }
    else {
      // Default user parameters
      this.username = username;
      this.userID = userID;
      this.first = first;
      this.last = last;
      this.age = age;
      this.email = email;
      this.profileImage = 'https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png';
      this.badges = [];
      this.tagline = "Newbie";
      this.about = `Hi, I'm ${first}!`;
      this.plates = [];

      this.add();
    }  
  }

  // UserDB.getCurrent() - Get User object for current logged in use
  static getCurrent = async () => {
    if (firebase.auth().currentUser !== null) {
        const user = firebase.auth().currentUser;
        const result = await users.doc(user.uid).get();
        const data = result.data();
        return new UserDB(data.userID, data.username, data.first, data.last, data.age, data.email);
    }
    return null; // no current user found
  }

  // UserDB.getCurrentUserID() - Get only userID (as string) for current logged in user
  static getCurrentUserID() {
    if (firebase.auth().currentUser !== null) { // logged in
        return firebase.auth().currentUser.uid;
    }
    return null; // no current user found
  }

  static _getData(userID) {
    var userData = {};
    users.doc(userID).get().then((doc) => {
      userData = doc.data();
      update(userData);
      return userData;
    })
    .catch((err) => {
      console.log("Could not find user from ID " + userID);
    });
  }

  // Get JSON object of user fields in database document
  get() {
    return User._getData(this.userID);
  }

  // Add user to database
  add() {
    let userData = {
      userID: this.userID,
      username: this.username,
      first: this.first,
      last: this.last,
      age: this.age,
      email: this.email,
      profileImage: this.profileImage,
      badges: this.badges,
      tagline: this.tagline,
      about: this.about,
      plates: this.plates
    };
    users.doc(this.userID).set(userData)
    .then((doc) => {
      return doc.id;
    })
    .catch((err) => {
      console.log("Could not create user given: \n" + userData);
    });
  }

  // UserDB.getAll() - Get JSON object of all users in collection
  static getAll() {
    var allUsers = {};
    users.get().then((snapshot) => {
      snapshot.forEach((doc) => {
      allUsers[doc.id] = doc.data();
      });
    return allUsers;
    })
    .catch((err) => {
      console.log('Error getting users', err);
    });
  }

  update(userData) {
    this.userID = userData.userID;
    this.username = userData.username;
    this.first = userData.first;
    this.last = userData.last;
    this.email = userData.email;
    this.age = userData.age;
    this.profileImage = userData.profileImage;
    this.badges = userData.badges;
    this.plates = userData.plates;
    this.about = userData.about;
    this.tagline = userData.tagline;
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
