import createEdit from "../todoList/createEdit"
import bindTouchAndClick from "../../functions/bindTouchAndClick";
import bindEnter from "../../functions/bindEnter";
import saveEdit from "../edit/saveEdit";
import cancelEdit from "../edit/cancelEdit";

// If edit input is Blurred : Cancel edit state without saving
const editBlurred = (e) => {
    let edit = e.target.parentElement.parentElement;
    let container = edit.parentElement;

    if (container.classList.contains("saving")) {
        return false;
    }

    let input = edit.querySelector(".input-container input");
    let button = edit.querySelector(".save-button");

    // Check if new focus is within the edit
    if (e.relatedTarget !== input && e.relatedTarget !== button) {
        cancelEdit(edit);
    }
}

// Todo-Edit Components : Event Handlers
const editFocused = (e) => {
    e.currentTarget.select();
}

const inputEnterPressed = (e) => {
    let edit = e.target.parentElement.parentElement;
    edit.removeEventListener("focusout", editBlurred);
    edit.querySelector(".save-button").click();
}

// Start editing phase
const startEdit = (e) => {
    console.log("startEditTriggered");
    let clickedEditButton = e.currentTarget;
    let todo = clickedEditButton.parentElement.parentElement;
    let container = todo.parentElement;

    if (container.classList.contains("transitioning")) {
        return
    }
    container.classList.add("transitioning");


    let value = todo.querySelector(".todo-value").innerText;
    let completed = todo.classList.contains("completed");
    let edit = createEdit(value, completed);
    let input = edit.querySelector("input")

    input.addEventListener("focus", editFocused);
    edit.addEventListener("focusout", editBlurred);

    container.replaceChild(edit, todo);
    input.focus();

    setTimeout(() => {
        container.classList.add("editing");
    }, 0);

    let saveButton = edit.querySelector(".save-button");

    if (userSettings.enableAnimations) {
        const startEditTransitionEnd = (e) => {
            // console.log(window.getComputedStyle(e.target).getPropertyValue("width"))
            if (e.target !== saveButton ||
                e.propertyName !== "width" ||
                container.classList.contains("force-delete")) {
                return
            }
            console.log("startEditTransitionEnd");
            // if (window.getComputedStyle(e.target).getPropertyValue("width") === "2px") {
            //     saveButton.removeEventListener("transitionend", startEditTransitionEnd);
            //     return;
            // }
            bindTouchAndClick(saveButton, saveEdit);
            bindEnter(input, inputEnterPressed);
            container.removeEventListener("transitionend", startEditTransitionEnd);
        }
        container.addEventListener("transitionend", startEditTransitionEnd);
    }
    else {
        bindTouchAndClick(saveButton, saveEdit);
        bindEnter(input, inputEnterPressed);
    }
}

export default startEdit;


