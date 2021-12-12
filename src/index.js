import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData, clearUserData } from "./app.js";
import bindAll from "./components/bindAll.js";
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
window.defaultTransitionTime = 300;
window.userSettings = { enableAnimations: true, confirmClearAll: false };
window.transitionTime = defaultTransitionTime;
window.todoCount = 0;

const startApp = () => {
    onAuthStateChanged(auth, (user) => {
        // Refreshing auth token does not need login
        if (user && currentUID === user.uid) {
            return;
        }
        if (user) {
            // User signed in
            currentUID = user.uid;
            getUserData();
        }
        else {
            // User signed out
            currentUID = null;
            clearUserData();
        }
    })
    bindAll();
}

window.addEventListener("load", startApp);

export { db, auth, currentUID };