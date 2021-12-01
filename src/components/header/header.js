import bindTouchAndClick from "../../functions/bindTouchAndClick";
import updateOptionButtons from "../../functions/updateOptionButtons";
import changeTab from "../../functions/changeTab";
import { settings, settingsButton, appContainer, gotoTopButton, menuItems, backButton, about, aboutButton, menu, menuButton, todoApp, signOutButton, progresIndicator } from "../../domShortcuts";
import { signOut } from "firebase/auth";
import { auth } from "../../index";
import "./header.css";


// Header
// Menu Button
const toggleMenu = () => {
    if (menu.classList.contains("active")) {
        // Hide menu
        if (!userSettings.enableAnimations) {
            appContainer.classList.remove("menu-shade");
        }
        menu.classList.remove("active");
        menuButton.removeEventListener("blur", menuFocusout);
        menu.removeEventListener("focusout", menuFocusout)
    }
    else {
        // Show menu
        menu.classList.add("active");
        appContainer.classList.add("menu-shade");
        menu.addEventListener("focusout", menuFocusout)
        menuButton.addEventListener("blur", menuFocusout);
        if (userSettings.enableAnimations) {
            menu.classList.add("transitioning");
        }
    }
}

const menuTransitionEnd = (e) => {
    if (e.target != menu) {
        return;
    }
    if (window.getComputedStyle(menu).getPropertyValue("height") === "0px") {
        appContainer.classList.remove("menu-shade");
    }
    menu.classList.remove("transitioning")
}

const menuFocusout = (e) => {
    if (!menuItems.includes(e.relatedTarget)) {
        toggleMenu();
    }
}

// Menu Click Handler
const menuSelect = (e) => {
    if (menu.classList.contains("transitioning")) {
        return
    }
    let target = e.target.closest("button")
    if (target === settingsButton) {
        changeTab(settings);
    }
    else if (target === aboutButton) {
        changeTab(about);
    }
    else if (target === signOutButton) {
        signOut(auth);
        appContainer.style.display = "none";
        appContainer.style.visibility = "hidden";
    }
    e.stopPropagation();
    if (userSettings.enableAnimations) {
        toggleMenu();
    }
}

//If animations enabled handle tabs after animations end
const tabTransitionEnd = (e) => {
    if (e.target === settings || e.target === about) {
        if (window.getComputedStyle(e.target).getPropertyValue("height") !== "0px") {
            appContainer.classList.remove("app-visible");
            backButton.focus();
        }
        else {
            appContainer.classList.remove("tab-shade");
            if (e.target === settings) {
                updateOptionButtons();
            }
        }
    }
}

// Back Button
const backButtonClicked = () => {
    changeTab(todoApp);
}

// Goto Top Button
// Show goto-top button if page is scrolled down 
const toggleGotoTopButton = () => {
    if (window.scrollY > 0) {
        gotoTopButton.classList.add("scrolled");
    }
    else {
        gotoTopButton.classList.remove("scrolled");
    }
}
// Goto top button scroll to top
const scrollToTop = () => {
    window.scrollTo(0, 0);
}

// Bindings for header and menu elements
const bindHeader = () => {
    document.addEventListener("scroll", toggleGotoTopButton);
    bindTouchAndClick(gotoTopButton, scrollToTop);
    settings.addEventListener("transitionend", tabTransitionEnd);
    about.addEventListener("transitionend", tabTransitionEnd);
    menu.addEventListener("transitionend", menuTransitionEnd);
    bindTouchAndClick(menu, menuSelect);
    bindTouchAndClick(menuButton, toggleMenu);
    bindTouchAndClick(gotoTopButton, scrollToTop);
    bindTouchAndClick(backButton, backButtonClicked);
}

export default bindHeader;