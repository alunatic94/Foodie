import {firebase, db} from '../database/Database';

users = db.collection('users');

export class User {

  // Create new User instance either from:
  // 1) User(userID) - existing user
  // 2) User(userID, username...) - create a new user
  constructor(userID="1234", username="foodie", first="John", last="Smith", age="99", email="jsmith@gmail.com") {
    console.log("get data for user");
    let existingUserData = null;
    users.doc(userID).get().then((doc) => {
      if (doc.exists) {
        userData = doc.data();
        this.update(userData);
        // User._getData(userID).then((userData) => {
        //   existingUserData = userData;
        //   this.update(existingUserData);
        //   console.log("existing user: " + JSON.stringify(existingUserData));
        // })
        console.log("existing user: " + JSON.stringify(userData));
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
    });
  }

  /* User.getCurrent() - Get User object for current logged in user
    Output: Object = 
    {
      userID: string,
      username: string,
      first: string,
      last: string,
      age: int,
      email: string,
      profileImage: string URL,
      badges: string[],
      tagline: string,
      about: string,
      plates: string[] of post ids
    } 
  */
  static getCurrent(userID=null) {
    if (firebase.auth().currentUser !== null) { // logged in
        return new User(User.getCurrentUserID());
        // let data = await User._getData(firebase.auth().currentUser.uid);
        // return new User(data.userID, data.username, data.first, data.last, data.age, data.email);
    }
    return null; // no current user found
  }

  // User.getCurrentUserID() - Get only userID (as string) for current logged in user
  static getCurrentUserID() {
    if (firebase.auth().currentUser !== null) { // logged in
        return firebase.auth().currentUser.uid;
    }
    return null; // no current user found
  }

  static async _getData(userID) {
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
  async get() {
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
      return doc.id; // user ID
    })
    .catch((err) => {
      console.log("Could not create user given: \n" + JSON.stringify(userData));
    });
  }

  // User.getAll() - Get JSON object of all users in collection
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
