import updateListVisibility from "../../functions/updateListVisibility";
import { todoList } from "../../domShortcuts";
import { db, currentUID } from "../../index";
import { ref, set } from "firebase/database";


const deletingCompleted = (e) => {
    if (e.target.classList.contains("deleting")) {
        e.target.removeEventListener("transitionend", deletingCompleted);
        todoList.removeChild(e.target);
    }
}

// Delete todo
const deleteTodo = (e) => {
    let clickedDeleteButton = e.currentTarget;
    let todo = clickedDeleteButton.parentElement.parentElement;
    let container = todo.parentElement;
    let todoID = container.getAttribute("id");

    if (container.classList.contains("transitioning")) {
        return
    }

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
    container.classList.add("deleting", "transitioning");
    container.addEventListener("transitionend", deletingCompleted);
}

export default deleteTodo;