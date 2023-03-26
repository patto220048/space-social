// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBDaI-gggZ6splR3wiQjrAfibmqU6RDxfw",
  authDomain: "social-d1456.firebaseapp.com",
  projectId: "social-d1456",  
  storageBucket: "social-d1456.appspot.com",
  messagingSenderId: "153974839998",
  appId: "1:153974839998:web:27632cfc2584149ffc9cef",
  measurementId: "G-NF73KSRXBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const providerGG = new GoogleAuthProvider()
export default app