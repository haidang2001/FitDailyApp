// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQz-m0OGdmIjTlo8UCECJO1sp9l0BmKuU",
  authDomain: "fitness-dcb94.firebaseapp.com",
  projectId: "fitness-dcb94",
  storageBucket: "fitness-dcb94.firebasestorage.app",
  messagingSenderId: "539462822260",
  appId: "1:539462822260:web:f3ada84906fcccd2582421"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  };
  