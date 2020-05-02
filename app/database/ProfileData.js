import {db} from '../database/Database';
import {User} from '../database/User';


export class ProfileData {
  users = db.collection('users');
  posts = db.collection('posts');
  // Create new Profile instance from:
  // ProfileData(userID) - can get current user ID with User.getCurrentUserID()
  constructor(userID) {
    this.userID = userID;
  }

  // Note: getProfile is async due to request fetch time
  // (otherwise returns undefined before fully loaded)
  // Use .then((profile) => {// do stuff...}) to grab profile data
  async getProfile() {
    var profileData = {};
    await this.users.doc(this.userID).get().then((doc) => {
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

  async getPlatesFromIDs(IDarray) {
    var plates = [];
    for (let ID of IDarray) {
      plateDoc = await this.posts.doc(ID).get();
      plate = plateDoc.data();
      plate.id = ID;
      plates.unshift(plate);
      // await posts.doc(ID).get().then((doc) => {
      //   plate = doc.data();
      //   plate.id = ID;
      //   plates.unshift(plate); // add most recent plates to beginning
      // })
      // .catch((err) => {
      // });
    }
    return plates;
  }

}