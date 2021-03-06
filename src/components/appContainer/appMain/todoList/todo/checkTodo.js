import { ref, set } from "firebase/database";
import { db, currentUID } from "../../../../../index";

// Mark item as completed
const checkTodo = (e) => {
    if (e.currentTarget.getAttribute("tabindex") === "-1") return;
    let clickedCheckButton = e.currentTarget;
    let todo = clickedCheckButton.parentElement.parentElement;
    let container = todo.parentElement;

    let todoID = container.getAttribute("id");
    let completed = todo.classList.contains("completed");
    todo.classList.toggle("completed");

    // Update firebase database
    let todoCompletedRef = ref(db, `${currentUID}/todos/${todoID}/completed`);
    set(todoCompletedRef, !completed);
}

export default checkTodo;