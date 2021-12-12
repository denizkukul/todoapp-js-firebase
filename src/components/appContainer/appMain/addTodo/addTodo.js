import { db, currentUID } from "../../../../index";
import { set, push, ref } from "firebase/database";
import { todoList, updateListVisibility } from "../appMain";
import createItemContainer from "../todoList/createItemContainer";
import createTodo from "../todoList/createTodo";
import "./addTodo.css";

const addTodoComponent = document.querySelector(".addtodo-component");
export const addInput = document.querySelector(".add-input");
export const addButton = document.querySelector(".add-button");

// Check if the submited todo value is valid
export const validateInput = (value) => {
    let regex = new RegExp(/[a-z]/i);
    if (!regex.test(value)) {
        return false;
    }
    else {
        return true;
    }
}

// Add-Todo Component
const addTodoFocusout = (e) => {
    let sibling = e.target.nextElementSibling || e.target.previousElementSibling;
    if (e.relatedTarget !== sibling) {
        addInput.value = "";
    }
}

const inputEnter = (e) => {
    if (e.key !== "Enter") return
    e.preventDefault();
    addTodo();
}

const addTodo = () => {
    let value = addInput.value;
    if (!validateInput(value)) {
        addInput.value = "";
        addInput.focus();
        return;
    };
    todoCount++;

    let newItemRef = push(ref(db, `${currentUID}/todos`));
    let newItemKey = newItemRef.key;
    let container = createItemContainer(newItemKey);
    let todo = createTodo(value);
    let buttons = Array.from(todo.querySelectorAll(".icon-button"));
    container.appendChild(todo);
    todoList.appendChild(container);

    // Update firebase database
    set(newItemRef, { "value": value, "completed": false });

    // Clear input field
    addInput.value = "";
    addInput.focus();
    updateListVisibility();


    // If animations are disabled move to the final state
    if (!userSettings.enableAnimations) {
        container.classList.remove("new-item");
        todoList.appendChild(container);
        buttons.forEach(button => button.setAttribute("tabindex", "0"));
        return
    }

    // Animate adding new todo.
    const addingCompleted = (e) => {
        if (!e.target === container) return;
        container.removeEventListener("transitionend", addingCompleted);
        container.classList.remove("adding", "transitioning");
        buttons.forEach(button => button.setAttribute("tabindex", "0"));
    }

    container.classList.add("adding", "transitioning");
    container.addEventListener("transitionend", addingCompleted);
    setTimeout(() => { container.classList.remove("new-item"); }, 20)
}

const bindAddTodo = () => {
    addTodoComponent.addEventListener("focusout", addTodoFocusout);
    addButton.addEventListener("click", addTodo);
    addInput.addEventListener("keypress", inputEnter);
}

export default bindAddTodo;