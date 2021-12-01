import { modal, confirmButton } from "../domShortcuts";
import modalTab from "./modalTab";

const showModal = () => {
    modal.classList.add("active");
    window.addEventListener("keydown", modalTab);
    if (!userSettings.enableAnimations) {
        confirmButton.focus();
    }
}

export default showModal;