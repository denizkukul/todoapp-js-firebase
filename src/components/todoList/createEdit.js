import { doneIcon, editIcon, deleteIcon } from "./icons";

// Create an edit item with given arguments.
const createEdit = (value, completed) => {
    let edit = document.createElement("div");
    edit.classList.add("edit");
    completed ? edit.classList.add("completed") : "";
    edit.setAttribute("data-value", `${value}`);
    edit.innerHTML = `
        <div class="check-container">
        <button class="app-button icon-button check-button" tabindex="-1">
            ${doneIcon}
        </button>
        </div >

        <div class="input-container">
            <input class="edit-input" type="text" value="${value}"/>
        </div>

        <div class="button-container">
            <button class="save-button text-button">Save</button>
            <button class="app-button icon-button edit-button" tabindex="-1">${editIcon}</button>
            <button class="app-button icon-button delete-button" tabindex="-1">${deleteIcon}</button>
        </div>`
    return edit;
}

export default createEdit;