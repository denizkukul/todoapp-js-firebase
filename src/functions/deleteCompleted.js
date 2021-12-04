import { ref, update } from "firebase/database";
import { todoList } from "../domShortcuts";
import { db, currentUID } from "../index";
import updateListVisibility from "./updateListVisibility";

const deleteWithTransition = (container) => {
    container.classList.add("force-delete", "transitioning");
    container.addEventListener("transitionend", () => {
        if (window.getComputedStyle(container).getPropertyValue("height") === "0px") {
            todoList.removeChild(container);
        }
    });
}

const deleteCompleted = () => {
    let completedTodos = Array.from(document.querySelectorAll(".completed"));
    let completedContainers = completedTodos.map(todo => todo.closest(".item-container"));
    if (!userSettings.enableAnimations) {
        completedContainers.forEach(container => {
            container.querySelector(".delete-button").click();
        })
    }
    else {
        let completedIDs = {};
        completedContainers.forEach(container => {
            deleteWithTransition(container);
            let id = container.getAttribute("id");
            completedIDs[id] = null;
        })
        //Update firebase database
        let todosRef = ref(db, `${currentUID}/todos`);
        update(todosRef, completedIDs);
        todoCount -= completedContainers.length;
        updateListVisibility();
    }
}
export default deleteCompleted;