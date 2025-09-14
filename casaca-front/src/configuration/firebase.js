// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_xNzG_-5k9nYL8LKSyUt4BA7fOOKWOWA",
    authDomain: "charlyrecipes.firebaseapp.com",
    projectId: "charlyrecipes",
    storageBucket: "charlyrecipes.firebasestorage.app",
    messagingSenderId: "250905035590",
    appId: "1:250905035590:web:889fb5e978e5c50fc75b47",
    measurementId: "G-PP91PQ0S08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth }

