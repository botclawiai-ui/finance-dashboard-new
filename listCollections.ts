import * as admin from 'firebase-admin';

// Load the JSON credentials from root.
const serviceAccount = require('../firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkCollections() {
    const collections = await db.listCollections();
    for (const collection of collections) {
        console.log("Collection name:", collection.id);
    }
}

checkCollections().catch(console.error);
