import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBVgxCT-9y3BjxV2k5r_iffgwISMJ2xGuA",
    authDomain: "vue-booking-system.firebaseapp.com",
    projectId: "vue-booking-system",
    storageBucket: "vue-booking-system.appspot.com",
    messagingSenderId: "717668755093",
    appId: "1:717668755093:web:17d888620d775d86ea9d9c"
};

const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);
const dbInstance = getFirestore(app);

export const auth = authInstance;
export const db = dbInstance;
