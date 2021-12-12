import { ref, set, update } from "firebase/database";
import { db, currentUID } from "../../../../index";
import { showModal } from "../../modal/modal";
import { updateListVisibility } from "../appMain";
import "./footer.css";

export const deleteCompletedButton = document.querySelector(".delete-completed-button");
export const deleteAllButton = document.querySelector(".delete-all-button");
const todoList = document.querySelector(".todolist");

const deleteWithTransition = (container) => {
    container.classList.add("force-delete", "transitioning");
    let buttons = Array.from(container.querySelectorAll(".icon-button"));
    buttons.forEach(button => button.setAttribute("tabindex", "-1"));
    container.addEventListener("transitionend", () => {
        if (window.getComputedStyle(container).getPropertyValue("height") === "0px") {
            todoList.removeChild(container);
        }
    });
}

// Delete completed todos
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

// Delete all todos
export const deleteAll = () => {
    let items = Array.from(document.querySelectorAll(".item-container"));
    if (!userSettings.enableAnimations) {
        items.forEach(item => {
            item.querySelector(".delete-button").click();
        })
    }
    else {
        items.forEach(item => {
            deleteWithTransition(item);
        })
        //Update firebase database
        let todosRef = ref(db, `${currentUID}/todos`);
        set(todosRef, null);
        todoCount = 0;
        updateListVisibility();
    }
}

const clearAllClicked = () => {
    if (userSettings.confirmClearAll) {
        showModal();
    }
    else {
        deleteAll();
    }
}

const bindFooter = () => {
    deleteCompletedButton.addEventListener("click", deleteCompleted);
    deleteAllButton.addEventListener("click", clearAllClicked);
}

export default bindFooter;