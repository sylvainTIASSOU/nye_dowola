// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7-OwdEKdN9MqrimKvzgBxdgQ6yv1w47Q",
    authDomain: "nyedowola.firebaseapp.com",
    projectId: "nyedowola",
    storageBucket: "nyedowola.appspot.com",
    messagingSenderId: "603074620863",
    appId: "1:603074620863:web:c6644428ef64ad632e850a",
    measurementId: "G-218HXRGDCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//ssconst analytics = getAnalytics(app);
export {app};