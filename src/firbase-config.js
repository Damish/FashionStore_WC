import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
    // apiKey: "<enter your firebase app api key>",
    // authDomain: "<enter your firebase auth domain>",
    // databaseURL: "<enter your firebase database url>",
    // projectId: "<enter your firebase project id>",
    // storageBucket: "<enter your firebase storage bucket>",
    // messagingSenderId: "<enter your firebase messaging sender id>"
    apiKey: "AIzaSyDWlTjgV6QeshwAs4X_368xRhOft3bOusY",
    authDomain: "fashionstoreapp-53a89.firebaseapp.com",
    databaseURL: "https://fashionstoreapp-53a89.firebaseio.com",
    projectId: "fashionstoreapp-53a89",
    storageBucket: "fashionstoreapp-53a89.appspot.com",
    //gs://fashionstoreapp-53a89.appspot.com
    messagingSenderId: "1056987683783",
    appId: "1:1056987683783:web:dc35dcf39c94fc846917e2",
    measurementId: "G-1S76QFSJK3"
};

firebase.initializeApp(config);

var storage = firebase.storage();

export {
    storage, firebase as default
};
