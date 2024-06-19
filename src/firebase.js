// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage}from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5sQj78AwUutOgIaOJ470f_Ga00YIZ1Lc",
  authDomain: "project-name-e7685.firebaseapp.com",
  projectId: "project-name-e7685",
  storageBucket: "project-name-e7685.appspot.com",
  messagingSenderId: "39754566265",
  appId: "1:39754566265:web:eeb595d89f9ae868fce2a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage =getStorage(app)
