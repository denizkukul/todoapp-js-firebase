import createTodo from "../todoList/createTodo";

// Cancel edit and set initial value
const cancelEdit = (edit) => {
    console.log("cancelEditTriggered")
    let container = edit.parentElement;
    if (container.classList.contains("saving")) {
        return;
    }

    let originalValue = edit.dataset.value;
    let originalCompleted = edit.classList.contains("completed");
    let todo = createTodo(originalValue, originalCompleted);
    let saveButton = edit.querySelector(".save-button");

    container.classList.add("saving");
    container.classList.remove("editing")
    let inputContainer = edit.querySelector(".input-container");

    // Change input element to todovalue
    inputContainer.classList.remove("input-container");
    inputContainer.classList.add("value-container");
    inputContainer.innerHTML = `
        <div class="todo-value">
            ${originalValue}
        </div>
    `

    if (userSettings.enableAnimations) {
        const cancelEditTransitionEnd = (e) => {
            if (e.target !== saveButton ||
                e.propertyName !== "width" ||
                container.classList.contains("force-delete")) {
                return
            }
            console.log("cancelEditTransitionEnd");
            container.replaceChild(todo, edit);
            container.classList.remove("saving", "transitioning");
            container.removeEventListener("transitionend", cancelEditTransitionEnd);
        }
        container.addEventListener("transitionend", cancelEditTransitionEnd);
    }
    else {
        container.replaceChild(todo, edit);
        container.classList.remove("saving", "transitioning");
    }
}

export default cancelEdit;