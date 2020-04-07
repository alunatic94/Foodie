import {db} from '../database/Database';

badges = db.collection('badges');

export class BadgeData {

  // Return array of badge objects given array of ID name strings
  static async getBadgesFromIDs(IDarray) {
    var userBadges = [];
    for (let ID of IDarray) {
      await badges.doc(ID).get().then((doc) => {
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