import {firebase, db} from 'Database';
import {User} from 'User';

export class Profile {
  profiles = db.collection('profiles');
  currentUser = new User(User.getCurrentUID());

  getProfile(uid) {
    var profileData = {};
    profiles.doc(uid).get().then((doc) => {
      profileData[doc.id] = doc.data();
      return profileData;
    })
    .catch((err) => {
      console.log("Could not find profile from Id '" + userId);
    });
  }

  getProfilePicture(uid) {
      var profileData = getProfile(uid);
      return profileData.picture;
  }

  addUser(username, uid, first, last, age, email) {
    let userData = {
      uid: uid,
      username: username,
      first: first,
      last: last,
      age: age,
      email: email
    };
    users.doc(userId).set(userData)
    .then((doc) => {
      return doc.id;
    })
    .catch((err) => {
      console.log("Could not create user given: \n" + userData);
    });
  }

  getAllUsers() {
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
