// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,onAuthStateChanged} from "firebase/auth"
import {getFirestore} from "firebase/firestore";

 const firebaseConfig = {
  apiKey: "AIzaSyCCeB0Ayr04UVw8cYw0Gez_ludVLu0lFUU",
  authDomain: "socialmediaapp-66680.firebaseapp.com",
  projectId: "socialmediaapp-66680",
  storageBucket: "socialmediaapp-66680.appspot.com",
  messagingSenderId: "89365947845",
  appId: "1:89365947845:web:e9b14f6d4fd9f7ef76d7ac",
  measurementId: "G-SJ1RLPT017"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db,onAuthStateChanged}