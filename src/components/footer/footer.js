import deleteAll from "../../functions/deleteAll";
import deleteCompleted from "../../functions/deleteCompleted";
import showModal from "../../functions/showModal"
import bindTouchAndClick from "../../functions/bindTouchAndClick";
import { deleteCompletedButton, deleteAllButton } from "../../domShortcuts";
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
    bindTouchAndClick(deleteCompletedButton, deleteCompleted);
    bindTouchAndClick(deleteAllButton, clearAllClicked);
}

export default bindFooterButtons;