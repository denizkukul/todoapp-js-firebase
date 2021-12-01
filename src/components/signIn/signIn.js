import "./signIn.css"
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { googleButton, progresIndicator, signInTab } from "../../domShortcuts";
import { auth } from "../../index";
import bindTouchAndClick from "../../functions/bindTouchAndClick";

const signIn = (e) => {
    let provider
    if (e.target === googleButton) {
        provider = new GoogleAuthProvider();
        signInTab.style.display = "none";
        progresIndicator.style.display = "flex";
        signInWithRedirect(auth, provider);
    }
}

bindTouchAndClick(googleButton, signIn);
