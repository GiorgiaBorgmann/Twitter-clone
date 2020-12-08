import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAQk0FuoipHwAU26k7lgubDzI7J5gmjw10",
    authDomain: "itc-twitter-12cb5.firebaseapp.com",
    projectId: "itc-twitter-12cb5",
    storageBucket: "itc-twitter-12cb5.appspot.com",
    messagingSenderId: "111883365672",
    appId: "1:111883365672:web:1023ee38c0678d0e36b41d",
    measurementId: "G-QNL7FFX2PT"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();