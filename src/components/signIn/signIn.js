import "./signIn.css"
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { signInButtons, progresIndicator, signInTab } from "../../domShortcuts";
import { auth } from "../../index";
import bindTouchAndClick from "../../functions/bindTouchAndClick";
import bindButtonLogic from "../../functions/bindButtonLogic";
import { textButtonStates } from "../../functions/buttonTypes";

const signIn = (e) => {
    let provider
    switch (e.target.dataset.provider) {
        case "google":
            provider = new GoogleAuthProvider();
            break;
        case "github":
            provider = new GithubAuthProvider();
            break;
        case "facebook":
            provider = new FacebookAuthProvider();
            break;
        default:
            break;
    }

    signInTab.style.display = "none";
    progresIndicator.style.display = "flex";
    signInWithRedirect(auth, provider)
}

signInButtons.forEach(button => {
    bindButtonLogic(button, textButtonStates, signIn);
})