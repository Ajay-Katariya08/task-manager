// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwVuMO-NVOuZpDIziSpEQlNGncuXsY_pU",
  authDomain: "todos-18.firebaseapp.com",
  projectId: "todos-18",
  storageBucket: "todos-18.firebasestorage.app",
  messagingSenderId: "224538719475",
  appId: "1:224538719475:web:6f61dfa4c9a66ad61fb386",
  measurementId: "G-X1VY99V75S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);