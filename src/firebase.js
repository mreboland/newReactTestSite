// firebase.js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';


// Initialize Firebase
const config = {
    apiKey: "AIzaSyCpCLrhllX-6wOUhJHhJb58MgMBipJkGK0",
    authDomain: "robs-site-b6446.firebaseapp.com",
    databaseURL: "https://robs-site-b6446.firebaseio.com",
    projectId: "robs-site-b6446",
    storageBucket: "robs-site-b6446.appspot.com",
    messagingSenderId: "231599405367",
    appId: "1:231599405367:web:a8e94430be3613d24902b2"
};

firebase.initializeApp(config);
// firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;