// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Paste your own config below 👇
const firebaseConfig = {
  apiKey: "AIzaSyAMHO5wG9iCqzvF_oBk8r5NGTLGCNzecD8",
  authDomain: "skillhive-auth.firebaseapp.com",
  projectId: "skillhive-auth",
  storageBucket: "skillhive-auth.firebasestorage.app",
  messagingSenderId: "337793322148",
  appId: "1:337793322148:web:e9e0b46705d8545332aa31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
