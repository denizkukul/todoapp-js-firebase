import { options } from "../domShortcuts";

// If settings changes are canceled move toggle buttons to original positions
const updateOptionButtons = () => {
    options.forEach((option) => {
        let optionName = option.dataset.optionName;
        if (userSettings[optionName]) {
            option.classList.add("on");
        }
        else {
            option.classList.remove("on");
        }
    })
}

export default updateOptionButtons;