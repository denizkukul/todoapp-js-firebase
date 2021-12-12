import { GoogleAuthProvider, GithubAuthProvider, signInWithRedirect, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { hideProgressIndicator, showProgressIndicator } from "../progressIndicator/progressIndicator";
import { clearUserData } from "../../app";
import { auth } from "../../index";
import "./signIn.css"

const signInTab = document.querySelector(".sign-in-tab");
const signInButtons = Array.from(signInTab.querySelectorAll(".sign-in-providers button"));
const gotoSignInButton = signInTab.querySelector(".goto-sign-in");
const gotoSignUpButton = signInTab.querySelector(".goto-sign-up");
const signInContainer = signInTab.querySelector(".sign-in-container");
const signInEmailInput = signInTab.querySelector(".sign-in-email input.email");
const signInPasswordInput = signInTab.querySelector(".sign-in-email input.password");
const signInEmailButton = signInTab.querySelector(".sign-in-email button.sign-in-button");
const signUpEmailInput = signInTab.querySelector(".sign-up-email input.email");
const signUpPasswordInput = signInTab.querySelector(".sign-up-email input.password");
const signUpEmailButton = signInTab.querySelector(".sign-up-email button.sign-up-button");


export const showSignIn = () => {
    signInTab.style.display = "flex";
    hideProgressIndicator();
}
const hideSignIn = () => {
    signInTab.style.display = "none";
}

const signIn = (e) => {
    let provider
    switch (e.currentTarget.dataset.provider) {
        case "google":
            provider = new GoogleAuthProvider();
            break;
        case "github":
            provider = new GithubAuthProvider();
            break;
        case "anonymous":
            provider = null;
            break;
    }

    hideSignIn();
    showProgressIndicator();
    if (provider !== null) {
        signInWithRedirect(auth, provider);
    }
    else {
        signInAnonymously(auth);
    }
}

const gotoSignIn = (e) => {
    if (e.currentTarget.getAttribute("tabindex") === "-1") return;
    e.currentTarget.setAttribute("tabindex", "-1");
    gotoSignUpButton.setAttribute("tabindex", "0");
    signInContainer.classList.add("show-sign-in");
    signInContainer.classList.remove("show-sign-up");
    signInEmailInput.focus();
}
const gotoSignUp = (e) => {
    if (e.currentTarget.getAttribute("tabindex") === "-1") return;
    e.currentTarget.setAttribute("tabindex", "-1");
    gotoSignInButton.setAttribute("tabindex", "0");
    signInContainer.classList.add("show-sign-up");
    signInContainer.classList.remove("show-sign-in");
    signUpEmailInput.focus();
}

const signUp = () => {
    let email = signUpEmailInput.value;
    let password = signUpPasswordInput.value;
    signUpEmailInput.value = "";
    signUpPasswordInput.value = "";
    hideSignIn();
    showProgressIndicator();
    createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            alert(error);
            clearUserData();
        })
}

const signInEmail = () => {
    let email = signInEmailInput.value;
    let password = signInPasswordInput.value;
    signInEmailInput.value = "";
    signInPasswordInput.value = "";
    hideSignIn();
    showProgressIndicator();
    signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            alert(error);
            clearUserData();
        })
}

const signInEnter = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    signInEmail();
}
const signUpEnter = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    signUp();
}
const signInEmailEnter = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    signInPasswordInput.focus();
}
const signUpEmailEnter = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    signUpPasswordInput.focus();
}

const bindSignIn = () => {
    signUpEmailButton.addEventListener("click", signUp);
    signInEmailButton.addEventListener("click", signInEmail);
    gotoSignInButton.addEventListener("click", gotoSignIn);
    gotoSignUpButton.addEventListener("click", gotoSignUp);
    signInEmailInput.addEventListener("keypress", signInEmailEnter);
    signUpEmailInput.addEventListener("keypress", signUpEmailEnter);
    signInPasswordInput.addEventListener("keypress", signInEnter);
    signUpPasswordInput.addEventListener("keypress", signUpEnter);
    signInButtons.forEach(button => {
        button.addEventListener("click", signIn);
    })
}

export default bindSignIn;