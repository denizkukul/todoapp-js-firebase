import { doneIcon, editIcon, deleteIcon } from "./icons";
import checkTodo from "../todo/checkTodo";
import startEdit from "../todo/startEdit";
import deleteTodo from "../todo/deleteTodo";
import bindButtonLogic from "../../functions/bindButtonLogic";
import saveEdit from "../edit/saveEdit";
import { textButtonStates, iconButtonStates } from "../../functions/buttonTypes";


// Create a todo item with given arguments
export const createTodo = (value, completed = false, initial = false) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    completed ? todo.classList.add("completed") : "";

    todo.innerHTML = `
        <div class="check-container">
            <button class="app-button icon-button check-button" tabindex="${initial ? "0" : "-1"}">
                ${doneIcon}
            </button>
        </div >
        <div class="value-container">
            <div class="todo-value">        
            ${value}
            </div>
        </div>
        <div class="button-container">
            <button class="save-button text-button" tabindex="-1">Save</button>
            <button class="app-button icon-button edit-button" tabindex="${initial ? "0" : "-1"}">${editIcon}</button>
            <button class="app-button icon-button delete-button" tabindex="${initial ? "0" : "-1"}">${deleteIcon}</button>
        </div>`

    bindButtonLogic(todo.querySelector(".check-button"), iconButtonStates, checkTodo);
    bindButtonLogic(todo.querySelector(".edit-button"), iconButtonStates, startEdit);
    bindButtonLogic(todo.querySelector(".delete-button"), iconButtonStates, deleteTodo);
    bindButtonLogic(todo.querySelector(".save-button"), textButtonStates, saveEdit);

    return todo;
}

export default createTodo;