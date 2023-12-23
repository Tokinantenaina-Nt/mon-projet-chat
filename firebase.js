const admin = require('firebase-admin')

const serviceAccount = require("./mon-projet-de-m-chat-firebase-adminsdk-e1exj-ff5f9c2dcb.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://(default).firebaseio.com/`,
});

const db = admin.firestore();
module.exports = db;
