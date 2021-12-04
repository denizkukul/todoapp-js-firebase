import updateListVisibility from "../../functions/updateListVisibility";
import { todoList } from "../../domShortcuts";
import { db, currentUID } from "../../index";
import { ref, set } from "firebase/database";
import { textButtonStates, iconButtonStates } from "../../functions/buttonTypes";


const deletingCompleted = (e) => {
    if (e.target.classList.contains("deleting")) {
        e.target.removeEventListener("transitionend", deletingCompleted);
        todoList.removeChild(e.target);
    }
}

// Delete todo
const deleteTodo = (e) => {
    let deleteButton = e.currentTarget;
    let todo = deleteButton.parentElement.parentElement;
    let container = todo.parentElement;
    let todoID = container.getAttribute("id");

    // Confirm item is not already taransitioning
    if (container.classList.contains("transitioning")) {
        return
    }

    // Delete Item    
    //Update firebase database
    let todoRef = ref(db, `${currentUID}/todos/${todoID}`);
    set(todoRef, null);
    todoCount--;
    updateListVisibility();

    if (!userSettings.enableAnimations) {
        todoList.removeChild(container)
        return;
    }

    // Animate delete todo
    let buttons = Array.from(todo.querySelectorAll(".icon-button"));
    // let saveButton = Array.from(todo.querySelectorAll(".save-button"));
    buttons.forEach(button => iconButtonStates.setButtonDisabled(button));

    // textButtonStates.setButtonDefault(deleteButton);
    container.classList.add("deleting", "transitioning");
    container.addEventListener("transitionend", deletingCompleted);
}

export default deleteTodo;