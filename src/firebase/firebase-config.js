import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqOWpvqQfDIWvpe6-yz0EI-GiqWLNmPk4",
  authDomain: "lunan-75e15.firebaseapp.com",
  databaseURL:
    "https://lunan-75e15-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lunan-75e15",
  storageBucket: "lunan-75e15.appspot.com",
  messagingSenderId: "1029237308637",
  appId: "1:1029237308637:web:e337c7924c7180fac42f34",
  measurementId: "G-CE28EPC8XE",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
