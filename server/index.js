import router from './routes/main-routes';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('json spaces', 2)

// mount all routes on /api path 
app.use('/api', router);

// Start app
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Server listening on port", PORT);
});

/*let users = db.collection('users');

function addUser(uid, firstName, lastName, email) {
	users.doc(docRef).set({
		firstName: firstName,
		lastName: lastName,
		email: email
	});
}

function getUsers() {
  users.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting users', err);
  });
}

addUser('johndoe', 'John', 'Doe', 'john@doe.com');
addUser('janesmith', 'Jane', 'Smith', 'jane@smith.net');
getUsers();*/

/* Firebase Realtime DB 
var firebase = require("firebase");

var serviceAccount = require("./auth/firebase-auth.json");

firebase.initializeApp({
  serviceAccount: "./auth/firebase-auth.json",
  databaseURL: "https://foodie-2db2e.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("/users");  //Set the current directory you are working in

ref.set([
{
    id: "id-1",
    name:"Jane Doe"
}]);

ref.push({
    id: "id-2",
    name:"John Doe",
});

ref.once("value", function(snapshot) {
  var data = snapshot.val();   //Data is in JSON format.
  console.log(data);
});
*/