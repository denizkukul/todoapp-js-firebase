import cancelEdit from "./cancelEdit";
import { validateInput } from "../../addTodo/addTodo";
import { ref, set } from "firebase/database";
import { db, currentUID } from "../../../../../index";
import { editInputBlurred, saveButtonBlurred } from "../todo/startEdit";

// End editing phase and create new todo with edited value
const saveEdit = (e) => {
    if (e.currentTarget.getAttribute("tabindex") === "-1") return;

    let saveButton = e.currentTarget;
    let edit = saveButton.parentElement.parentElement;
    let container = edit.parentElement;
    let input = edit.querySelector(".edit-input");
    let value = input.value;

    input.removeEventListener("blur", editInputBlurred);
    saveButton.removeEventListener("blur", saveButtonBlurred);

    // Confirm input value is valid
    if (!validateInput(value)) {
        cancelEdit(edit);
        return;
    }

    container.classList.add("saving");
    let buttons = Array.from(edit.querySelectorAll(".icon-button"));
    let todoID = container.getAttribute("id");
    let valueContainer = edit.querySelector(".value-container");
    valueContainer.innerHTML = `<div class="todo-value">${value}</div>`;

    // Update firebase database
    let todoValueRef = ref(db, `${currentUID}/todos/${todoID}/value`);
    set(todoValueRef, value);

    // End edit satate and save changes
    saveButton.setAttribute("tabindex", "-1");

    edit.removeAttribute("data-val");
    container.classList.remove("editing");

    // If animations are disabled move to the final state
    if (!userSettings.enableAnimations) {
        container.classList.remove("saving", "transitioning");
        buttons.forEach(button => button.setAttribute("tabindex", "0"));
        return
    }

    const saveEditCompleted = (e) => {
        if (e.target !== saveButton || window.getComputedStyle(saveButton).getPropertyValue("right") === "0px") return
        container.classList.remove("saving", "transitioning");
        if (!container.classList.contains("force-delete")) {
            buttons.forEach(button => button.setAttribute("tabindex", "0"));
        }
    }

    edit.addEventListener("transitionend", saveEditCompleted);
}

export default saveEdit;