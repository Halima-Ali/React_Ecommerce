import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2qwMsOlBqsmAxn9hNeOqO9ENuCQCjUb0",
  authDomain: "ecommerce-6b823.firebaseapp.com",
  projectId: "ecommerce-6b823",
  storageBucket: "ecommerce-6b823.appspot.com",
  messagingSenderId: "872836861015",
  appId: "1:872836861015:web:169695d011c93745fde712",
  measurementId: "G-VDGBY6LM3B",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth, db };
