import deleteAll from "../../functions/deleteAll";
import modalTab from "../../functions/modalTab";
import bindButtonLogic from "../../functions/bindButtonLogic";
import { confirmButton, cancelButton, modalShade, modal } from "../../domShortcuts";
import { textButtonStates } from "../../functions/buttonTypes";
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

const bindModal = () => {
    modalShade.addEventListener("click", cancelDelete);
    modalShade.addEventListener("touchstart", cancelDelete);
    bindButtonLogic(confirmButton, textButtonStates, confirmDelete);
    bindButtonLogic(cancelButton, textButtonStates, cancelDelete);
}

export default bindModal;