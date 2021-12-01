import bindTouchAndClick from "../../functions/bindTouchAndClick";
import deleteAll from "../../functions/deleteAll";
import modalTab from "../../functions/modalTab";
import { confirmButton, cancelButton, modalShade, modal } from "../../domShortcuts";
import "./modal.css"

// Modal window
const confirmDelete = () => {
    modal.classList.remove("active");
    window.removeEventListener("keydown", modalTab);
    deleteAll();
}

const cancelDelete = () => {
    window.removeEventListener("keydown", modalTab);
    modal.classList.remove("active");
}

const modalTransitionEnd = (e) => {
    if (e.target === modal) {
        confirmButton.focus();
    }
}

const bindModal = () => {
    bindTouchAndClick(modalShade, cancelDelete);
    bindTouchAndClick(confirmButton, confirmDelete);
    bindTouchAndClick(cancelButton, cancelDelete);
    modal.addEventListener("transitionend", modalTransitionEnd);
}

export default bindModal;