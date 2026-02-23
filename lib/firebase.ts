// penguinapp/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-rGu5UM4awVBKWlPs_mrhpzuZcCFjix4",
  authDomain: "penguin-11916.firebaseapp.com",
  projectId: "penguin-11916",
  storageBucket: "penguin-11916.firebasestorage.app",
  messagingSenderId: "194233750862",
  appId: "1:194233750862:web:a947ffcfc00a065620ba1f",
  measurementId: "G-3GBHESCD7Z"
};

// Initialize Firebase (Singleton pattern for Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize and EXPORT services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;