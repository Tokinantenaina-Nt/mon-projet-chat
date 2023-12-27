require('dotenv').config()
const admin = require('firebase-admin')

const serviceAccount = require(`${process.env.SERVICE_ACCOUNT_KEY}`);//('./path/to/your/serviceAccountKey.json')



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `'https://'${process.env.FIREBASE_DB}'.firebaseio.com/'`,
});

const db = admin.firestore();
module.exports = db;
