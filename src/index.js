import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { startApp, clearApp } from "./app.js";
import showSignIn from "./functions/showSignIn";
import "./index.css";

const firebaseConfig = {
    apiKey: "AIzaSyCCLuqU-pBi-GIAQMdIz4xrFbUzyqLujlo",
    authDomain: "todoappa-js.firebaseapp.com",
    databaseURL: "https://todoappa-js-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todoappa-js",
    storageBucket: "todoappa-js.appspot.com",
    messagingSenderId: "955847386141",
    appId: "1:955847386141:web:a7e7ab96c049880b1a92f4"
};

// Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

var currentUID;

// Global Variables
window.defaultTransitionTime = 500;
window.userSettings = { enableDrag: true, enableAnimations: true, confirmClearAll: false, newTodoTop: false };
window.transitionTime = defaultTransitionTime;
window.todoCount = 0;

onAuthStateChanged(auth, (user) => {
    if (user && currentUID === user.uid) {
        return;
    }
    if (user) {
        currentUID = user.uid;
        startApp();
    } else {
        currentUID = null;
        clearApp();
        showSignIn();
    }
})
export { db, currentUID, auth };