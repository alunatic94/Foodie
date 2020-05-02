import {db} from '../database/Database';

export class BadgeData {

  // Return array of badge objects given array of ID name strings
  static async getBadgesFromIDs(IDarray) {
    var userBadges = [];
    for (let ID of IDarray) {
      await db.collection("badges").doc(ID).get().then((doc) => {
        badge = doc.data();
        userBadges.push(badge);
      })
      .catch((err) => {
        console.log("Could not find badge from ID '" + ID);
      });
    }
    return userBadges;
  }

}