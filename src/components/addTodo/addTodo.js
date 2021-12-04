import { addButton, addInput, addTodoComponent, todoList } from "../../domShortcuts";
import { db, currentUID } from "../../index";
import { set, push, ref } from "firebase/database";
import validateInput from "../../functions/validateInput";
import createItemContainer from "../../functions/createItemContainer";
import createTodo from "../todoList/createTodo";
import updateListVisibility from "../../functions/updateListVisibility";
import bindButtonLogic from "../../functions/bindButtonLogic";
import bindInputEnter from "../../functions/bindInputEnter";
import { textButtonStates, iconButtonStates } from "../../functions/buttonTypes";
import "./addTodo.css";

// Add-Todo Component
const addTodoFocusout = (e) => {
    let sibling = e.target.nextElementSibling || e.target.previousElementSibling;
    if (e.relatedTarget !== sibling) {
        addInput.value = "";
    }
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
    container.appendChild(todo);
    todoList.appendChild(container);

    // Update firebase database
    set(newItemRef, { "value": value, "completed": false });

    // Clear input field
    addInput.value = "";
    addInput.focus();
    updateListVisibility();

    let buttons = Array.from(todo.querySelectorAll(".icon-button"));

    // If animations are disabled move to the final state
    if (!userSettings.enableAnimations) {
        container.classList.remove("new-item");
        todoList.appendChild(container);
        buttons.forEach(button => iconButtonStates.setButtonEnabled(button));
        return
    }

    // Animate adding new todo.
    const addingCompleted = (e) => {
        if (e.target !== container) return;
        container.removeEventListener("transitionend", addingCompleted);
        container.classList.remove("adding", "transitioning");
        buttons.forEach(button => iconButtonStates.setButtonEnabled(button));
    }

    container.classList.add("adding", "transitioning");
    todoList.appendChild(container);
    setTimeout(() => { container.classList.remove("new-item"); }, 20)
    container.addEventListener("transitionend", addingCompleted);
}

const bindAddTodo = () => {
    addTodoComponent.addEventListener("focusout", addTodoFocusout);
    bindButtonLogic(addButton, textButtonStates, addTodo);
    bindInputEnter(addInput, addButton, addTodo);
}

export default bindAddTodo;