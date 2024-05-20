// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3GR0JHv1VRntBviVNc-MoWSPS4v4kaHk",
  authDomain: "pokecatch-76be3.firebaseapp.com",
  projectId: "pokecatch-76be3",
  storageBucket: "pokecatch-76be3.appspot.com",
  messagingSenderId: "822870274518",
  appId: "1:822870274518:web:7410923a11d2d958d87477"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};