// Cancel edit and set initial value
const cancelEdit = (edit) => {
    let container = edit.parentElement;
    if (container.classList.contains("saving")) return;

    let saveButton = edit.querySelector(".save-button");
    let originalValue = edit.dataset.val;
    let valueContainer = edit.querySelector(".value-container");
    let buttons = Array.from(edit.querySelectorAll(".icon-button"));

    // Cancel edit changes and return to default state
    saveButton.setAttribute("tabindex", "-1");
    edit.removeAttribute("data-val");
    container.classList.add("saving");
    container.classList.remove("editing");
    valueContainer.innerHTML = `<div class="todo-value">${originalValue}</div>`;

    // If animations are disabled move to the final state
    if (!userSettings.enableAnimations) {
        container.classList.remove("saving", "transitioning");
        buttons.forEach(button => button.setAttribute("tabindex", "0"));
        return
    }

    const cancelEditCompleted = (e) => {
        if (e.target !== saveButton || window.getComputedStyle(saveButton).getPropertyValue("right") === "0px") return
        container.classList.remove("saving", "transitioning");
        if (!container.classList.contains("force-delete")) {
            buttons.forEach(button => button.setAttribute("tabindex", "0"));
        }
    }

    setTimeout(() => {
        container.classList.remove("saving", "transitioning");
        if (!container.classList.contains("force-delete")) {
            buttons.forEach(button => button.setAttribute("tabindex", "0"));
        }
    }, transitionTime / 2);

    edit.addEventListener("transitionend", cancelEditCompleted);
}

export default cancelEdit;