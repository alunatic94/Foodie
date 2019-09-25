var admin = require("firebase-admin");

var serviceAccount = require("../auth/foodie-hotspots.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://foodie-2db2e.firebaseio.com"
});

export var db = admin.firestore();
