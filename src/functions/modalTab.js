import { confirmButton, cancelButton } from "../domShortcuts";

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

export default modalTab;