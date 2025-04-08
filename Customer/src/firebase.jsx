import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUXDpp9apCuzkTvwMS2-5pgrWwnubTrno",
  authDomain: "desi-delights-7d8a4.firebaseapp.com",
  projectId: "desi-delights-7d8a4",
  storageBucket: "desi-delights-7d8a4.appspot.com",
  messagingSenderId: "585737677099",
  appId: "1:585737677099:web:23f04721ffb8b0c7793d6e",
  measurementId: "G-Q28N1GG5F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db,auth };