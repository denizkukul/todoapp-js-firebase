import cancelEdit from "./cancelEdit";
import createTodo from "../todoList/createTodo";
import validateInput from "../../functions/validateInput"
import { ref, set } from "firebase/database";
import { db, currentUID } from "../../index";

// End editing phase and create new todo with edited value
const saveEdit = (e) => {
    console.log("saveEditTriggered");
    let clickedSaveButton = e.currentTarget;
    let edit = clickedSaveButton.parentElement.parentElement;
    let container = edit.parentElement;

    if (container.classList.contains("saving")) {
        return;
    }

    let value = edit.querySelector(".edit-input").value;

    if (!validateInput(value)) {
        cancelEdit(edit);
        return;
    }

    container.classList.add("saving");
    let inputContainer = edit.querySelector(".input-container");

    // Change input element to todovalue
    inputContainer.classList.remove(".input-container");
    inputContainer.classList.add(".value-container");
    inputContainer.innerHTML = `
            <div class="todo-value">
                ${value}
            </div>
    `

    let completed = edit.classList.contains("completed");
    let todoID = container.getAttribute("id");
    let todo = createTodo(value, completed);

    container.classList.remove("editing")

    //update firebase database
    let todoValueRef = ref(db, `${currentUID}/todos/${todoID}/value`);
    set(todoValueRef, value);

    if (userSettings.enableAnimations) {
        const saveEditTransitionEnd = (e) => {
            if (e.propertyName !== "width" || container.classList.contains("force-delete")) {
                return
            }
            container.classList.remove("saving", "transitioning");
            container.replaceChild(todo, edit);
        }
        clickedSaveButton.addEventListener("transitionend", saveEditTransitionEnd);
    }
    else {
        container.replaceChild(todo, edit);
        container.classList.remove("saving", "transitioning");
    }
}

export default saveEdit;