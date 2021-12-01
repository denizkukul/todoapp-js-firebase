// Handle enter keypress in input field
const bindEnter = (element, func) => {
    const eventHandler = (e) => {
        if (e.key === "Enter") {
            func(e);
        }
    }
    element.addEventListener("keypress", eventHandler);
}

export default bindEnter;