import { addButton, addInput, addTodoComponent, todoList } from "../../domShortcuts";
import { db, currentUID } from "../../index";
import { set, push, ref } from "firebase/database";
import bindTouchAndClick from "../../functions/bindTouchAndClick";
import bindEnter from "../../functions/bindEnter";
import validateInput from "../../functions/validateInput";
import createItemContainer from "../../functions/createItemContainer";
import createTodo from "../todoList/createTodo";
import updateListVisibility from "../../functions/updateListVisibility";
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

    if (!userSettings.enableAnimations) {
        todoList.appendChild(container);
        return
    }

    // Animate adding new todo.
    const addingCompleted = (e) => {
        if (e.target === container) {
            container.classList.remove("adding", "transitioning");
            container.removeEventListener("transitionend", addingCompleted);
        }
    }

    container.classList.add("new-item", "adding", "transitioning");
    todoList.appendChild(container);
    setTimeout(() => { container.classList.remove("new-item"); }, 0)
    container.addEventListener("transitionend", addingCompleted);
}

const bindAddTodo = () => {
    addTodoComponent.addEventListener("focusout", addTodoFocusout);
    bindTouchAndClick(addButton, addTodo);
    bindEnter(addInput, addTodo);
}

export default bindAddTodo;