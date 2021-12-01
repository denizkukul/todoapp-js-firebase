import bindTouchAndClick from "../../functions/bindTouchAndClick";
import { doneIcon, editIcon, deleteIcon } from "./icons";
import checkTodo from "../todo/checkTodo";
import startEdit from "../todo/startEdit";
import deleteTodo from "../todo/deleteTodo";

// Create a todo item with given arguments
export const createTodo = (value, completed = false) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    completed ? todo.classList.add("completed") : "";

    todo.innerHTML = `
        <div class="check-container">
            <button class="app-button icon-button check-button">
                ${doneIcon}
            </button>
        </div >
        <div class="value-container">
            <div class="todo-value">        
            ${value}
            </div>
        </div>
        <div class="button-container">
            <button class="app-button icon-button edit-button">${editIcon}</button>
            <button class="app-button icon-button delete-button">${deleteIcon}</button>
        </div>`

    bindTouchAndClick(todo.querySelector(".check-button"), checkTodo);
    bindTouchAndClick(todo.querySelector(".edit-button"), startEdit);
    bindTouchAndClick(todo.querySelector(".delete-button"), deleteTodo);

    return todo;
}

export default createTodo;