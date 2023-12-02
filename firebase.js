// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSCAeMXNZgbwDSqZbj7N31Zat2z1h1wU0",
  authDomain: "delivery-portal-11823.firebaseapp.com",
  projectId: "delivery-portal-11823",
  storageBucket: "delivery-portal-11823.appspot.com",
  messagingSenderId: "822533192173",
  appId: "1:822533192173:web:ead0cab9b9b1274a69cfe4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();