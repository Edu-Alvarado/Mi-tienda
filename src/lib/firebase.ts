// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkV1n2CcD5BwvmAsgtQGkx7YrBbxr6brs",
  authDomain: "mi-tienda-d620f.firebaseapp.com",
  projectId: "mi-tienda-d620f",
  storageBucket: "mi-tienda-d620f.firebasestorage.app",
  messagingSenderId: "847383963862",
  appId: "1:847383963862:web:0ea0335e5e3feedaba4177",
  measurementId: "G-H4RXZXCFWR"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
