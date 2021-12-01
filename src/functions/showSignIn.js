import { progresIndicator, signInTab } from "../domShortcuts";

const showSignIn = () => {
    progresIndicator.style.display = "none";
    signInTab.style.display = "flex";
}

export default showSignIn;