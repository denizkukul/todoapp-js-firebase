import { todoApp, addInput } from "../domShortcuts";

// Toggle list visibility depending on list having any items
const updateListVisibility = () => {
    if (todoCount === 0) {
        todoApp.classList.remove("list-visible");
        addInput.focus();
    }
    else {
        todoApp.classList.add("list-visible");
    }
}

export default updateListVisibility;