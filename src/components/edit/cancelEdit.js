import { iconButtonStates, textButtonStates } from "../../functions/buttonTypes";

// Cancel edit and set initial value
const cancelEdit = (edit) => {
    let container = edit.parentElement;

    // Confirm item is not already in transition
    if (container.classList.contains("saving")) {
        return;
    }

    let originalValue = edit.dataset.val;
    edit.removeAttribute("data-val");
    let saveButton = edit.querySelector(".save-button");
    textButtonStates.setButtonDisabledImmediate(saveButton);

    // Cancel edit changes and return to default state
    container.classList.add("saving");
    container.classList.remove("editing");
    let buttons = Array.from(edit.querySelectorAll(".icon-button"));
    let valueContainer = edit.querySelector(".value-container");
    valueContainer.innerHTML = `<div class="todo-value">${originalValue}</div>`;

    if (!userSettings.enableAnimations) {
        container.classList.remove("saving", "transitioning");
        buttons.forEach(button => iconButtonStates.setButtonEnabled(button));
    }
    else {
        setTimeout(() => {
            container.classList.remove("saving", "transitioning");
            buttons.forEach(button => iconButtonStates.setButtonEnabled(button));
            textButtonStates.setButtonDisabledImmediate(saveButton);
        }, defaultTransitionTime / 2);
    }
}

export default cancelEdit;