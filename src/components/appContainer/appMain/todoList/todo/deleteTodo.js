import { db, currentUID } from "../../../../../index";
import { ref, set } from "firebase/database";
import { todoList, updateListVisibility } from "../../appMain";

// Delete todo
const deleteTodo = (e) => {
    let deleteButton = e.currentTarget;
    if (deleteButton.getAttribute("tabindex") === "-1") return;
    let todo = deleteButton.parentElement.parentElement;
    let container = todo.parentElement;
    let todoID = container.getAttribute("id");
    let buttons = Array.from(todo.querySelectorAll(".icon-button"));
    buttons.forEach(button => button.setAttribute("tabindex", "-1"));

    //Update firebase database
    let todoRef = ref(db, `${currentUID}/todos/${todoID}`);
    set(todoRef, null);
    todoCount--;

    // Delete Item    
    updateListVisibility();
    if (!userSettings.enableAnimations) {
        todoList.removeChild(container);
        return;
    }

    // Animate delete todo
    const deletingCompleted = (e) => {
        if (e.target !== container) return;
        container.removeEventListener("transitionend", deletingCompleted);
        todoList.removeChild(container);
    }

    container.classList.add("deleting", "transitioning");
    container.addEventListener("transitionend", deletingCompleted);
}

export default deleteTodo;