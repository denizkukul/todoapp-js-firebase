const bindButtonLogic = (button, type, func) => {
    /* Focus */
    const buttonFocus = (e) => {
        e.currentTarget.dataset.status = "focused";
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        type.setButtonFocused(e.currentTarget);
    }
    const buttonBlur = (e) => {
        let initialStatus = e.currentTarget.dataset.status;
        e.currentTarget.dataset.status = "default";
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        if (initialStatus === "active") {
            type.setButtonDefaultImmediate(e.currentTarget);
        }
        else {
            type.setButtonDefault(e.currentTarget);
        }
    }
    const buttonMouseEnter = (e) => {
        e.currentTarget.dataset.status = "focused";
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        type.setButtonFocused(e.currentTarget);
    }
    const buttonMouseLeave = (e) => {
        let initialStatus = e.currentTarget.dataset.status;
        e.currentTarget.dataset.status = "default";
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        if (initialStatus === "active") {
            type.setButtonDefaultImmediate(e.currentTarget);
        }
        else {
            type.setButtonDefault(e.currentTarget);
        }
    }

    /* Click */
    const buttonMouseDown = (e) => {
        e.currentTarget.dataset.status = "active";
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        e.preventDefault();
        type.setButtonActive(e.currentTarget);
    }
    const buttonMouseUp = (e) => {
        e.currentTarget.dataset.status = "focused";
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        type.setButtonFocusedImmediate(e.currentTarget);
    }
    const buttonClick = (e) => {
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        func(e);
    }

    /* Keypress */
    const buttonKeydown = (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.currentTarget.dataset.status = "active";
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        e.preventDefault();
        type.setButtonActive(e.currentTarget);
    }

    const buttonKeyup = (e) => {
        if (e.key !== "Enter" && e.key !== " ") return
        let initialStatus = e.currentTarget.dataset.status;
        if (e.currentTarget.getAttribute("tabindex") === "-1") {
            e.currentTarget.dataset.status = "default";
            return;
        }
        e.preventDefault();
        if (initialStatus === "active") {
            func(e);
        }
        if (e.currentTarget.dataset.status === "active") {
            e.currentTarget.dataset.status = "focused";
            type.setButtonFocusedImmediate(e.currentTarget);
        }
        else {
            e.currentTarget.dataset.status = "default";
            type.setButtonDefaultImmediate(e.currentTarget);
        }
    }

    /* Touch */
    const buttonTouchStart = (e) => {
        e.currentTarget.dataset.status = "active";
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        e.preventDefault()
        type.setButtonActive(e.currentTarget);
    }

    const buttonTouchMove = (e) => {
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        let currentTargetPosition = e.currentTarget.getBoundingClientRect();
        let touchPositionX = e.touches[0].clientX;
        let touchPositionY = e.touches[0].clientY;
        if (currentTargetPosition.top > touchPositionY ||
            currentTargetPosition.bottom < touchPositionY ||
            currentTargetPosition.left > touchPositionX ||
            currentTargetPosition.right < touchPositionX) {
            e.currentTarget.dataset.status = "default";
            type.setButtonDefault(e.currentTarget);
        }
    }

    const buttonTouchEnd = (e) => {
        if (e.currentTarget.getAttribute("tabindex") === "-1") return;
        if (e.currentTarget.dataset.status === "active") {
            type.setButtonDefaultImmediate(e.currentTarget);
            func(e);
        }
    }


    /* Focus */
    button.addEventListener("focus", buttonFocus);
    button.addEventListener("blur", buttonBlur);
    button.addEventListener("mouseenter", buttonMouseEnter);
    button.addEventListener("mouseleave", buttonMouseLeave);
    /* Click */
    button.addEventListener("mousedown", buttonMouseDown);
    button.addEventListener("mouseup", buttonMouseUp);
    button.addEventListener("click", buttonClick);
    /* Keypress */
    button.addEventListener("keydown", buttonKeydown);
    button.addEventListener("keyup", buttonKeyup);
    /* Touch */
    button.addEventListener("touchstart", buttonTouchStart);
    button.addEventListener("touchmove", buttonTouchMove);
    button.addEventListener("touchend", buttonTouchEnd);
}

export default bindButtonLogic;








