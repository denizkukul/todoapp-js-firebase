import { ref, set } from "firebase/database";
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

const deleteAll = () => {
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
export default deleteAll;