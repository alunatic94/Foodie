import {db} from '../controllers/auth-controller';
let users = db.collection('users');
let FieldValue = require('firebase-admin').firestore.FieldValue;

function load(req, res, next) {
	var userData = {};
	users.doc(req.params.userId).get().then((doc) => {
		userData[doc.id] = doc.data();
		req.user = userData;
		return next();
	})
	.catch((err) => {
		console.log("Could not find user from Id '" + req.params.userId);
	});
}

function get(req, res) {
  return res.json(req.user);
}

function add(req, res, next) {
	users.add(req.body)
	.then((doc) => {
		console.log("New user added: id = " + doc.id);
		res.sendStatus(200);
	})
	.catch((err) => {
		console.log("Could not create user given: \n" + req.body);
	})
}

function getAll(req, res, next) {
  var allUsers = {};
  users.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
	  allUsers[doc.id] = doc.data();
    });
	console.log(allUsers);
	res.json(allUsers);
  })
  .catch((err) => {
    console.log('Error getting users', err);
  });
}

export default { load, get, getAll, add };