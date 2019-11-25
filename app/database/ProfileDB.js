import {firebase, db} from '../database/Database';
import {UserDB} from '../database/UserDB';

users = db.collection('users');

export class ProfileDB {
  // Create new Profile instance from:
  // ProfileDB(userID) - can get current user ID with UserDB.getCurrentUserID()
  constructor(userID) {
    this.userID = userID;
  }

  // Note: getProfile is async due to request fetch time
  // (otherwise returns undefined before fully loaded)
  // Use .then((profile) => {// do stuff...}) to grab profile data
  async getProfile() {
    var profileData = {};
    await users.doc(this.userID).get().then((doc) => {
      profileData = doc.data();
    })
    .catch((err) => {
      console.log("Could not find profile from ID '" + this.userID);
    });
    return profileData;
  }

  static getProfilePicture() {
      return this.profileData.profileImage;
  }

}