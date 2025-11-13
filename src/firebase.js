// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBup3Qjymaq8LxxWxcsWwd3dGDu9xADZdM",
  authDomain: "schoolishacker.firebaseapp.com",
  projectId: "schoolishacker",
  storageBucket: "schoolishacker.appspot.com",
  messagingSenderId: "767991803975",
  appId: "1:767991803975:web:bb5dba2ee3958cbb1f0162",
  measurementId: "G-E7F18T9PEP"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log("✅ Firebase initialized:", app.name);
