import { deleteAll } from "../appMain/footer/footer";
import "./modal.css"

const modal = document.querySelector(".modal");
const modalShade = document.querySelector(".modal-shade");
const confirmButton = document.querySelector(".confirm-button");
const cancelButton = document.querySelector(".cancel-button");

// Tab button only switched between modal options
const modalTab = (e) => {
    if (e.key === "Tab") {
        e.preventDefault();
        let element = document.activeElement;
        if (element === confirmButton) {
            cancelButton.focus();
        }
        else {
            confirmButton.focus();
        }
    }
}

export const showModal = () => {
    window.addEventListener("keydown", modalTab);
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
}
const hideModal = () => {
    window.removeEventListener("keydown", modalTab);
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
}

const confirmDelete = () => {
    hideModal();
    deleteAll();
}

const cancelDelete = () => {
    hideModal();
}

const bindModal = () => {
    modalShade.addEventListener("click", cancelDelete);
    modalShade.addEventListener("touchstart", cancelDelete);
    confirmButton.addEventListener("click", confirmDelete);
    cancelButton.addEventListener("click", cancelDelete);
}

export default bindModal;