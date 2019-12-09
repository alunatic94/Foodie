import {firebase, db} from '../database/Database';

users = db.collection('users');

export class User {

  static defaults = {
    profileImage: 'https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png',
    badges: [],
    tagline: "Newbie",
    about: "Hello there!",
    plates: []
  };

  static dummyUser = {
    userID: "1234",
    username: "jsmith",
    first: "John",
    last: "Smith",
    age: 99,
    email: "dummy@user.com",
    profileImage: 'https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png',
    badges: [],
    tagline: 'Dummy',
    about: "I'm a dummy user.",
    plates: []
};

  constructor(userData) {
    this.data = userData;
    this.update(userData);
  }

  static async getExisting(userID) {
    var userData = {};
    var user;
    await users.doc(userID).get().then((doc) => {
      userData = doc.data();
      user = new User(userData);
    })
    .catch((err) => {
      console.log("Could not find user from ID '" + userID);
    });
    return user;
  }

  static async createNew(userID, username, first, last, age, email) {
    userData = {};

    userData.profileImage = User.defaults.profileImage;
    userData.badges = User.defaults.badges;
    userData.tagline = User.defaults.tagline;
    userData.about = `Hi, I'm ${first}!`;
    userData.plates = User.defaults.plates;

    users.doc(this.userID).set(userData)
    .then((doc) => {
      return new User(userData);
    })
    .catch((err) => {
      console.log("Could not create user given: \n" + JSON.stringify(userData));
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
  static async getCurrent(userID=null) {
    if (firebase.auth().currentUser !== null) { // logged in
      console.log("User - getCurrent() called");
      user = await User.getExisting(User.getCurrentUserID());
      return user;
    }
  }

  // User.getCurrentUserID() - Get only userID (as string) for current logged in user
  static getCurrentUserID() {
    if (firebase.auth().currentUser !== null) { // logged in
        return firebase.auth().currentUser.uid;
    }
    return null; // no current user found
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