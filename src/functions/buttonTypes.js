export const textButtonStates = {
    setButtonDefault: (button) => {
        button.style.cursor = "default";
        button.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color1)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), right var(--half-transition-time)";
    },
    setButtonDefaultImmediate: (button) => {
        button.style.cursor = "default";
        button.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color1)";
    },
    setButtonFocused: (button) => {
        button.style.cursor = "pointer";
        button.style.color = "var(--color9)";
        button.style.backgroundColor = "var(--color6)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), right var(--half-transition-time)";
    },
    setButtonFocusedImmediate: (button) => {
        button.style.cursor = "pointer";
        button.style.backgroundColor = "var(--color6)";
        button.style.color = "var(--color9)";
        button.style.transition = "background-color 0s, color 0s, right var(--half-transition-time)";
    },
    setButtonActive: (button) => {
        button.style.cursor = "pointer";
        button.style.color = "var(--color1)";
        button.style.backgroundColor = "var(--color8)";
        button.style.transition = "background-color 0s, color 0s, right var(--half-transition-time)";
    },
    setButtonDisabled: (button) => {
        button.style.cursor = "default";
        button.setAttribute("tabindex", "-1");
        button.dataset.status = "default";
        button.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color1)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), right var(--half-transition-time)";
    },
    setButtonDisabledImmediate: (button) => {
        button.style.cursor = "default";
        button.dataset.status = "default";
        button.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color1)";
        button.style.transition = "background-color 0s, color 0s, right var(--half-transition-time)";
        button.setAttribute("tabindex", "-1");
    },
    setButtonEnabled: (button) => {
        button.setAttribute("tabindex", "0");
        if ((button.dataset.status === "default") || (button.dataset.status === "active")) {
            button.style.cursor = "default";
            textButtonStates.setButtonDefaultImmediate(button);
        }
        else if (button.dataset.status === "focused") {
            button.style.cursor = "pointer";
            textButtonStates.setButtonFocused(button);
        }
    }
}
export const iconButtonStates = {
    setButtonDefault: (button) => {
        button.style.cursor = "default";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color1)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), opacity var(--half-transition-time)";
        button.firstElementChild.style.transition = "color var(--half-transition-time), opacity var(--half-transition-time)";
    },
    setButtonDefaultImmediate: (button) => {
        button.style.cursor = "default";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color1)";
    },
    setButtonFocused: (button) => {
        button.style.cursor = "pointer";
        button.style.backgroundColor = "var(--color5)";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), opacity var(--half-transition-time)";
        button.firstElementChild.style.transition = "color var(--half-transition-time), opacity var(--half-transition-time)";
    },
    setButtonFocusedImmediate: (button) => {
        button.style.cursor = "pointer";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color5)";
        button.style.transition = "background-color 0s, color 0s, opacity var(--half-transition-time)";
        button.firstElementChild.style.transition = "background-color 0s, color 0s, opacity var(--half-transition-time)";
    },
    setButtonActive: (button) => {
        button.style.cursor = "pointer";
        button.firstElementChild.style.color = "var(--color1)";
        button.style.backgroundColor = "var(--color7)";
        button.style.transition = "background-color 0s, color 0s";
        button.firstElementChild.style.transition = "background-color 0s, color 0s, opacity var(--half-transition-time)";
    },
    setButtonDisabled: (button) => {
        button.style.cursor = "default";
        button.setAttribute("tabindex", "-1");
        button.dataset.status = "default";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color1)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), opacity var(--half-transition-time)";
        button.firstElementChild.style.transition = "color var(--half-transition-time), opacity var(--half-transition-time)";
    },
    setButtonEnabled: (button) => {
        button.setAttribute("tabindex", "0");
        if ((button.dataset.status === "default") || (button.dataset.status === "active")) {
            iconButtonStates.setButtonDefaultImmediate(button);
        }
        else if (button.dataset.status === "focused") {
            button.style.cursor = "pointer";
            iconButtonStates.setButtonFocused(button);
        }
    }
}
export const headerButtonStates = {
    setButtonDefault: (button) => {
        button.style.cursor = "default";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color2)";
        button.firstElementChild.style.transition = "color var(--half-transition-time)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), opacity var(--half-transition-time) linear, visibility var(--half-transition-time) linear";
    },
    setButtonDefaultImmediate: (button) => {
        button.style.cursor = "default";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color2)";
    },
    setButtonFocused: (button) => {
        button.style.cursor = "pointer";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color5)";
        button.firstElementChild.style.transition = "color var(--half-transition-time)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), opacity var(--half-transition-time) linear, visibility var(--half-transition-time) linear";
    },
    setButtonFocusedImmediate: (button) => {
        button.style.cursor = "pointer";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color5)";
        button.firstElementChild.style.transition = "color 0s";
        button.style.transition = "background-color 0s";
    },
    setButtonActive: (button) => {
        button.style.cursor = "pointer";
        button.firstElementChild.style.color = "var(--color1)";
        button.style.backgroundColor = "var(--color7)";
        button.firstElementChild.style.transition = "color 0s";
        button.style.transition = "background-color 0s, color 0s, opacity 0s, visibility 0s";
    },
    setButtonDisabled: (button) => {
        button.style.cursor = "default";
        button.setAttribute("tabindex", "-1");
        button.dataset.status = "default";
        button.style.visibility = "hidden";
        button.style.opacity = "0";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color2)";
        button.firstElementChild.style.transition = "color var(--half-transition-time)";
        button.style.transition = "background-color 0s, color 0s, opacity var(--half-transition-time) linear, visibility var(--half-transition-time) linear";
    },
    setButtonEnabled: (button, gotoTopButton = false) => {
        button.style.cursor = "default";
        button.setAttribute("tabindex", `${gotoTopButton ? "4" : "1"}`);
        button.dataset.status = "default";
        button.style.visibility = "visible";
        button.style.opacity = "1";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color2)";
        button.firstElementChild.style.transition = "color var(--half-transition-time)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), opacity var(--half-transition-time) linear var(--half-transition-time), visibility var(--half-transition-time) linear var(--half-transition-time)";
    },
    setButtonEnabledNoDelay: (button) => {
        button.style.cursor = "default";
        button.setAttribute("tabindex", "4");
        button.dataset.status = "default";
        button.style.visibility = "visible";
        button.style.opacity = "1";
        button.firstElementChild.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color2)";
        button.firstElementChild.style.transition = "color var(--half-transition-time)";
        button.style.transition = "background-color var(--half-transition-time), color var(--half-transition-time), opacity var(--half-transition-time) linear, visibility var(--half-transition-time) linear";
    }
}
export const optionButtonStates = {
    setButtonDefault: (button) => {
        button.style.cursor = "default";
        button.style.color = "var(--color8)";
        button.style.boxShadow = "0 0 0 0 var(--color6)";
        button.style.backgroundColor = "var(--color1)";
        button.style.transition = "background-color var(--option-transition-time), box-shadow var(--option-transition-time), color var(--option-transition-time)";
    },
    setButtonDefaultImmediate: (button) => {
        button.querySelector(".option-description").style.color = "var(--color8)";
        button.style.boxShadow = "0 0 0 0 var(--color6)";
        button.style.cursor = "default";
        button.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color1)";
    },
    setButtonFocused: (button) => {
        button.style.cursor = "pointer";
        button.style.boxShadow = "0 0 0 4px var(--color6)";
        button.style.backgroundColor = "var(--color1)";
        button.style.transition = "background-color var(--option-transition-time), box-shadow var(--option-transition-time), color var(--option-transition-time)";
    },
    setButtonFocusedImmediate: (button) => {
        button.style.cursor = "pointer";
        button.querySelector(".option-description").style.color = "var(--color8)";
        button.style.boxShadow = "0 0 0 4px var(--color6)";
        button.style.color = "var(--color9)";
        button.style.backgroundColor = "var(--color1)";
        button.style.transition = "background-color 0s, box-shadow 0s";
    },
    setButtonActive: (button) => {
        button.querySelector(".option-description").style.color = "var(--color1)";
        button.style.cursor = "pointer";
        button.style.backgroundColor = "var(--color7)";
        button.style.transition = "background-color 0s, box-shadow 0s";
    }
}
export const footerButtonStates = {
    setButtonDefault: (button) => {
        button.style.cursor = "default";
        button.style.transition = "";
    },
    setButtonDefaultImmediate: (button) => {
        button.style.cursor = "default";
        button.style.transition = "";
    },
    setButtonFocused: (button) => {
        button.style.cursor = "pointer";
        button.style.transition = "";
    },
    setButtonFocusedImmediate: (button) => {
        button.style.cursor = "pointer";
        button.style.transition = "";
    },
    setButtonActive: (button) => {
        button.style.cursor = "pointer";
        button.style.transition = "";
    },
    setButtonDisabled: (button) => {
        button.style.cursor = "default";
        button.setAttribute("tabindex", "-1");
        button.style.transition = "";
    },
    setButtonEnabled: (button) => {
        button.style.cursor = "pointer";
        button.style.transition = "";
        button.setAttribute("tabindex", "0");
    }
}
export const menuButtonStates = {
    setButtonDefault: (button) => {
        let icon = button.querySelector(".material-icons");
        button.style.cursor = "default";
        icon.style.color = "var(--color8)";
        button.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color2)";
        button.style.transition = "color var(--half-transition-time), background-color var(--half-transition-time)";
    },
    setButtonDefaultImmediate: (button) => {
        let icon = button.querySelector(".material-icons");
        button.style.cursor = "default";
        icon.style.color = "var(--color8)";
        button.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color2)";
    },
    setButtonFocused: (button) => {
        let icon = button.querySelector(".material-icons");
        button.style.cursor = "pointer";
        icon.style.color = "var(--color8)";
        button.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color5)";
        button.style.transition = "color var(--half-transition-time), background-color var(--half-transition-time)";
    },
    setButtonFocusedImmediate: (button) => {
        let icon = button.querySelector(".material-icons");
        button.style.cursor = "pointer";
        icon.style.color = "var(--color8)";
        button.style.color = "var(--color8)";
        button.style.backgroundColor = "var(--color5)";
    },
    setButtonActive: (button) => {
        let icon = button.querySelector(".material-icons");
        button.style.cursor = "pointer";
        icon.style.color = "var(--color1)";
        button.style.color = "var(--color1)";
        button.style.backgroundColor = "var(--color8)";
        button.style.transition = "color 0s, background-color 0s";
    }
}