import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Fikk ikke til å lagre nøklene lokalt så må bare laste opp alle
const app = initializeApp({
  apiKey: "AIzaSyB5kCqCnT65uLdbIjPeWL0sM9Ooro8rqbw",
  authDomain: "travelbuddy-a3460.firebaseapp.com",
  projectId: "travelbuddy-a3460",
  storageBucket: "travelbuddy-a3460.appspot.com",
  messagingSenderId: "710566974309",
  appId: "1:710566974309:web:3fd3adb4c2fb243492c78c",
  measurementId: "G-0EF6VC2PTQ",
});

const db = getFirestore(app);

const auth = getAuth(app);

export default app;

export { db, auth };