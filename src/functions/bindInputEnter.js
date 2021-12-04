import { textButtonStates } from "./buttonTypes";

const bindInputEnter = (input, button, func, disable = false) => {
    const inputKeydown = (e) => {
        if (e.key === "Enter" && button.getAttribute("tabindex") !== "-1") {
            e.preventDefault();
            textButtonStates.setButtonActive(button);
        }
    }
    const inputKeyup = (e) => {
        if (e.key === "Enter" && button.getAttribute("tabindex") !== "-1") {
            e.preventDefault();
            if (document.activeElement === input) {
                if (disable) {
                    textButtonStates.setButtonDisabledImmediate(button);
                }
                func(e);
            }
            if (!disable) {
                textButtonStates.setButtonDefaultImmediate(button);
            }
        }
    }
    input.addEventListener("keydown", inputKeydown);
    input.addEventListener("keyup", inputKeyup);
}

export default bindInputEnter;