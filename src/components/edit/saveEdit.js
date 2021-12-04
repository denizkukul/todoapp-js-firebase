import cancelEdit from "./cancelEdit";
import validateInput from "../../functions/validateInput"
import { ref, set } from "firebase/database";
import { db, currentUID } from "../../index";
import { iconButtonStates, textButtonStates } from "../../functions/buttonTypes";
import { editBlurred } from "../todo/startEdit";

// End editing phase and create new todo with edited value
const saveEdit = (e) => {

    let saveButton = e.currentTarget;
    let edit = saveButton.parentElement.parentElement;
    let container = edit.parentElement;

    // Confirm item is not already in transition
    if (container.classList.contains("saving")) {
        return;
    }

    let value = edit.querySelector(".edit-input").value;

    // Confirm input value is valid
    if (!validateInput(value)) {
        cancelEdit(edit);
        return;
    }

    // End edit satate and save changes
    textButtonStates.setButtonDisabledImmediate(saveButton);
    edit.removeEventListener("focusout", editBlurred);
    edit.removeAttribute("data-val");
    container.classList.add("saving");
    container.classList.remove("editing");

    let buttons = Array.from(edit.querySelectorAll(".icon-button"));
    let todoID = container.getAttribute("id");
    let valueContainer = edit.querySelector(".value-container");
    valueContainer.innerHTML = `<div class="todo-value">${value}</div>`;

    // Update firebase database
    let todoValueRef = ref(db, `${currentUID}/todos/${todoID}/value`);
    set(todoValueRef, value);

    // If animations are disabled move to the final state
    if (!userSettings.enableAnimations) {
        container.classList.remove("saving", "transitioning");
        buttons.forEach(button => iconButtonStates.setButtonEnabled(button));
    }
    else {
        setTimeout(() => {
            container.classList.remove("saving", "transitioning");
            buttons.forEach(button => iconButtonStates.setButtonEnabled(button));
        }, defaultTransitionTime / 2);
    }
}

export default saveEdit;