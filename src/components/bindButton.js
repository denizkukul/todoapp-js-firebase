// Handling both click and touch events for buttons
const bindButton = (button, func) => {
    const eventHandler = (e) => {
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        if (e.type === "touchstart" && e.cancelable) {
            e.preventDefault();
            e.currentTarget.classList.add("touch-active");
            return
        }
        if (e.type === "touchend") {
            e.preventDefault();
            if (!e.currentTarget.classList.contains("touch-active")) return;
            func(e);
            e.currentTarget.classList.remove("touch-active");
            return
        }
        if (e.type === "touchmove") {
            e.preventDefault();
            let currentTargetPosition = e.currentTarget.getBoundingClientRect();
            let touchPositionX = e.touches[0].clientX;
            let touchPositionY = e.touches[0].clientY;
            if (currentTargetPosition.top >= touchPositionY ||
                currentTargetPosition.bottom <= touchPositionY ||
                currentTargetPosition.left >= touchPositionX ||
                currentTargetPosition.right <= touchPositionX) {
                e.currentTarget.classList.remove("touch-active");
            }
            return;
        }
        if (e.type === "click") {
            func(e);
        }
    }

    button.addEventListener("click", eventHandler);
    button.addEventListener("touchstart", eventHandler);
    button.addEventListener("touchmove", eventHandler);
    button.addEventListener("touchend", eventHandler);
}

export default bindButton;
