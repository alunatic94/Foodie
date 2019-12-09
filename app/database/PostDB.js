import {firebase, db} from '../database/Database';
posts = db.collection('posts');

export class PostDB {

    // Create new User instance either from:
    // 1) UserDB(userID) - existing user
    // 2) UserDB(userID, username...) - create a new user
    constructor(images=null, likes=null, rating=null, review=null, timestamp=null, userID=null, postID=null) {
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
  
    // UserDB.getCurrent() - Get User object for current logged in user
    static getCurrent(userID=null) {
      if (firebase.auth().currentUser !== null) { // logged in
          let data = User._getData(firebase.auth().currentUser.uid);
          return new User(data.userID, data.username, data.first, data.last, data.age, data.email);
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
      console.log(allUsers);
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