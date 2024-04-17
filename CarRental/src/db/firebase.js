// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { deleteDoc, getFirestore, updateDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDwoz06Zni2VzDSqJ3OIW0j0LNvZopXmA4",
    authDomain: "carrental-10bea.firebaseapp.com",
    projectId: "carrental-10bea",
    storageBucket: "carrental-10bea.appspot.com",
    messagingSenderId: "955121347539",
    appId: "1:955121347539:web:e8aa1aef898e78ac9b9d26",
    measurementId: "G-CPTFB34CTZ",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export {app, db, analytics};