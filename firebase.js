var admin = require("firebase-admin");

var serviceAccount = require("./db_link.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;