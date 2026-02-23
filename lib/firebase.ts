import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Your verified PENGUIN project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-rGu5UM4awVBKWlPs_mrhpzuZcCFjix4",
  authDomain: "penguin-11916.firebaseapp.com",
  // Realtime Database URL is MANDATORY for RTDB to work
  databaseURL: "https://penguin-11916-default-rtdb.firebaseio.com", 
  projectId: "penguin-11916",
  storageBucket: "penguin-11916.firebasestorage.app",
  messagingSenderId: "194233750862",
  appId: "1:194233750862:web:a947ffcfc00a065620ba1f",
  measurementId: "G-3GBHESCD7Z"
};

/**
 * Fix for "API Key Not Valid" in Next.js:
 * We use the Singleton pattern to ensure Firebase only starts once.
 */
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize and Export Services
export const auth = getAuth(app);
export const rtdb = getDatabase(app); // This connects to your .firebaseio.com URL
export const db = getFirestore(app);

export default app;