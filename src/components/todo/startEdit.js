import saveEdit from "../edit/saveEdit";
import cancelEdit from "../edit/cancelEdit";
import bindInputEnter from "../../functions/bindInputEnter";
import { iconButtonStates, textButtonStates } from "../../functions/buttonTypes";

// If edit input is Blurred : Cancel edit state without saving
export const editBlurred = (e) => {
    if (!e.target.classList.contains("save-button") &&
        !e.target.classList.contains("edit-input")) {
        return
    }

    let edit = e.target.parentElement.parentElement;
    let container = edit.parentElement;

    if (container.classList.contains("saving")) {
        return false;
    }

    let input = edit.querySelector(".value-container input");
    let button = edit.querySelector(".save-button");

    // Check if new focus is within the edit
    if (e.relatedTarget !== input && e.relatedTarget !== button) {
        input && input.removeEventListener("focus", editFocused);
        edit && edit.removeEventListener("focusout", editBlurred);
        cancelEdit(edit);
    }
}

// Todo-Edit Components : Event Handlers
const editFocused = (e) => {
    e.currentTarget.select();
}

// Start editing phase
const startEdit = (e) => {
    // Get item container to check for transition
    let editButton = e.currentTarget;
    let todo = editButton.parentElement.parentElement;
    let container = todo.parentElement;

    // Check if item is already in transition
    if (container.classList.contains("transitioning")) {
        return
    }

    // Get shortcuts to DOM elements
    let iconButtons = Array.from(todo.querySelectorAll(".icon-button"));
    let valueContainer = todo.querySelector(".value-container");
    let saveButton = todo.querySelector(".save-button");
    let value = todo.querySelector(".todo-value").innerText;
    todo.setAttribute("data-val", value);

    // Start transition into edit
    container.classList.add("transitioning");
    // Change value container to input field
    valueContainer.innerHTML = `<input class="edit-input" type="text" value="${value}"/>`;
    let input = todo.querySelector("input");

    input.addEventListener("focus", editFocused);
    todo.addEventListener("focusout", editBlurred);

    input.focus();

    setTimeout(() => {
        container.classList.add("editing");
    }, 0);

    // Disable buttons during edit state
    iconButtons.forEach(button => iconButtonStates.setButtonDisabled(button));

    // If animations are disabled move to the final state
    if (!userSettings.enableAnimations) {
        textButtonStates.setButtonEnabled(saveButton);
        bindInputEnter(input, saveButton, saveEdit, true);
    }
    else {
        setTimeout(() => {
            textButtonStates.setButtonEnabled(saveButton);
            bindInputEnter(input, saveButton, saveEdit, true);
        }, defaultTransitionTime / 2);
    }
}

export default startEdit;


