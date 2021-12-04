import { todoApp, addInput, deleteAllButton, deleteCompletedButton } from "../domShortcuts";
import { footerButtonStates } from "./buttonTypes";

// Toggle list visibility depending on list having any items
const updateListVisibility = () => {
    if (todoCount === 0) {
        todoApp.classList.remove("list-visible");
        footerButtonStates.setButtonDisabled(deleteCompletedButton);
        footerButtonStates.setButtonDisabled(deleteAllButton);
        addInput.focus();
    }
    else {
        todoApp.classList.add("list-visible");
        footerButtonStates.setButtonEnabled(deleteCompletedButton);
        footerButtonStates.setButtonEnabled(deleteAllButton);
    }
}

export default updateListVisibility;