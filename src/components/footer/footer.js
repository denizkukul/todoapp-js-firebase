import deleteAll from "../../functions/deleteAll";
import deleteCompleted from "../../functions/deleteCompleted";
import showModal from "../../functions/showModal"
import bindButtonLogic from "../../functions/bindButtonLogic";
import { deleteCompletedButton, deleteAllButton } from "../../domShortcuts";
import { footerButtonStates } from "../../functions/buttonTypes";
import "./footer.css";

// Footer Buttons
// Delete all todos
const clearAllClicked = () => {
    if (userSettings.confirmClearAll) {
        showModal();
    }
    else {
        deleteAll();
    }
}

const bindFooterButtons = () => {
    bindButtonLogic(deleteCompletedButton, footerButtonStates, deleteCompleted);
    bindButtonLogic(deleteAllButton, footerButtonStates, clearAllClicked);
}

export default bindFooterButtons;