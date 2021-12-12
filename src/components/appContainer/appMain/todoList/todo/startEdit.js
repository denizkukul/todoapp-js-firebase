import cancelEdit from "../edit/cancelEdit";

// Todo-Edit Components : Event Handlers
export const editInputBlurred = (e) => {
    let edit = e.target.parentElement.parentElement;
    let saveButton = edit.querySelector(".save-button");
    if (e.relatedTarget === saveButton) return;
    e.target.removeEventListener("blur", editInputBlurred);

    cancelEdit(edit);
}

export const saveButtonBlurred = (e) => {
    let edit = e.target.parentElement.parentElement;
    let input = edit.querySelector(".edit-input");
    if (e.relatedTarget === input) return;
    e.target.removeEventListener("blur", saveButtonBlurred);
    cancelEdit(edit);
}

const editFocused = (e) => {
    e.currentTarget.select();
}

const inputEnter = (e) => {
    if (e.key !== "Enter") return
    e.preventDefault();
    let saveButton = e.target.parentElement.parentElement.querySelector(".save-button");
    e.target.removeEventListener("blur", editInputBlurred);
    saveButton.removeEventListener("blur", saveButtonBlurred);
    saveButton.focus();
    saveButton.click();
}

// Start editing phase
const startEdit = (e) => {
    if (e.currentTarget.getAttribute("tabindex") === "-1") return;
    let editButton = e.currentTarget;
    let todo = editButton.parentElement.parentElement;
    let container = todo.parentElement;
    let buttons = Array.from(todo.querySelectorAll(".icon-button"));
    let saveButton = todo.querySelector(".save-button");
    let valueContainer = todo.querySelector(".value-container");
    let value = todo.querySelector(".todo-value").innerText;
    todo.setAttribute("data-val", value);

    // Start transition into edit
    container.classList.add("transitioning");
    // Change value container to input field
    valueContainer.innerHTML = `<input class="edit-input" type="text" value="${value}"/>`;
    let input = todo.querySelector("input");

    input.addEventListener("focus", editFocused);
    input.addEventListener("blur", editInputBlurred);

    input.focus();

    // Disable buttons during edit state
    buttons.forEach(button => button.setAttribute("tabindex", "-1"));

    // If animations are disabled move to the final state
    if (!userSettings.enableAnimations) {
        container.classList.add("editing");
        saveButton.setAttribute("tabindex", "0");
        input.addEventListener("keypress", inputEnter);
        saveButton.addEventListener("blur", saveButtonBlurred);
        return
    }

    const startEditCompleted = (e) => {
        if (e.target !== saveButton) return
        if (window.getComputedStyle(saveButton).getPropertyValue("right") !== "0px") {
            todo.removeEventListener("transitionend", startEditCompleted);
            return
        }
        todo.removeEventListener("transitionend", startEditCompleted);
        saveButton.setAttribute("tabindex", "0");
        input.addEventListener("keypress", inputEnter);
        saveButton.addEventListener("blur", saveButtonBlurred);
    }

    setTimeout(() => {
        container.classList.add("editing");
    }, 0);
    todo.addEventListener("transitionend", startEditCompleted);
}

export default startEdit;


