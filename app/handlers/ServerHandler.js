import {db} from 'DBHandler';

export class UserHandler {
  users = db.collection('users');
  getUser(userId) {
    var userData = {};
    users.doc(userId).get().then((doc) => {
      userData[doc.id] = doc.data();
      return userData;
    })
    .catch((err) => {
      console.log("Could not find user from Id '" + userId);
    });
  }

  addUser(userId, first, last, age, email) {
    let userData = {
      firstName: first,
      lastName: last,
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
