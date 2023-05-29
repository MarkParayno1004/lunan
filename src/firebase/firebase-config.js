import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA_xGC0IlgZJcjuno_lgAx1_5TwLkRoWYc",
    authDomain: "lunancapstone.firebaseapp.com",
    projectId: "lunancapstone",
    storageBucket: "lunancapstone.appspot.com",
    messagingSenderId: "350722858345",
    appId: "1:350722858345:web:91f22488821de48743f1f8",
    measurementId: "G-K9QBCMKGSC"
  };

  export const app = initializeApp(firebaseConfig);
  export const firestore = getFirestore(app);
  export const auth = getAuth(app);