// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDecPqtGirjLjNGyM2IV313-eWNXXmegQQ",
  authDomain: "codehort-auth.firebaseapp.com",
  projectId: "codehort-auth",
  storageBucket: "codehort-auth.appspot.com",
  messagingSenderId: "335606363105",
  appId: "1:335606363105:web:ee119a4c05b4dcc13018a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);

