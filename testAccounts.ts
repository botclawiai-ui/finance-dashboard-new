import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.replace(/['"]/g, ''),
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.replace(/['"]/g, ''),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.replace(/['"]/g, ''),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.replace(/['"]/g, ''),
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.replace(/['"]/g, ''),
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.replace(/['"]/g, ''),
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testAccounts() {
    console.log("Fetching accounts collection...");
    const q1 = query(collection(db, "transactions"), limit(1));
    const s1 = await getDocs(q1);
    console.log(`Found ${s1.size} docs in 'transactions'`);
    s1.forEach(doc => console.log(doc.id, doc.data()));

    const q2 = query(collection(db, "Accounts"), limit(5));
    const s2 = await getDocs(q2);
    console.log(`Found ${s2.size} docs in 'Accounts'`);
    s2.forEach(doc => console.log(doc.id, doc.data()));

    // Also try to grab everything to see if there's any other collection known.
    // Web SDK doesn't support listCollections, but we can query 'balances' maybe
    const q3 = query(collection(db, "balances"), limit(5));
    const s3 = await getDocs(q3);
    console.log(`Found ${s3.size} docs in 'balances'`);
    s3.forEach(doc => console.log(doc.id, doc.data()));
}
testAccounts().then(() => {
    console.log("Done");
    process.exit(0);
}).catch(console.error);
