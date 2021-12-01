// Handle tocuh and click events
const bindTouchAndClick = (element, func) => {
    const eventHandler = (e) => {
        if (e.type === "touchend") {
            e.preventDefault()
        }
        func(e);
    }
    element.addEventListener("click", eventHandler);
    element.addEventListener("touchend", eventHandler);
}

export default bindTouchAndClick;