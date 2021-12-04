import bindTouchAndClick from "../../functions/bindTouchAndClick";
import updateOptionButtons from "../../functions/updateOptionButtons";
import changeTab from "../../functions/changeTab";
import { settings, settingsButton, appContainer, gotoTopButton, menuItems, backButton, about, aboutButton, menu, menuButton, todoApp, toggleLoginButton } from "../../domShortcuts";
import { signOut } from "firebase/auth";
import { auth } from "../../index";
import bindButtonLogic from "../../functions/bindButtonLogic";
import { headerButtonStates, menuButtonStates } from "../../functions/buttonTypes";
import "./header.css";


// Header
// Menu Button
const clickedOutsideMenu = (e) => {
    let target = e.target.closest("button");
    if (!menuItems.includes(target)) {
        window.removeEventListener("click", clickedOutsideMenu);
        hideMenu();
    }
}

const hideMenu = () => {
    if (!userSettings.enableAnimations) {
        appContainer.classList.remove("menu-shade");
    }
    menu.classList.remove("active");
    menuButton.removeEventListener("blur", menuFocusout);
    menu.removeEventListener("focusout", menuFocusout);
    window.removeEventListener("click", clickedOutsideMenu);
}

const showMenu = () => {
    menu.classList.add("active");
    appContainer.classList.add("menu-shade");
    menu.addEventListener("focusout", menuFocusout)
    menuButton.addEventListener("blur", menuFocusout);
    if (userSettings.enableAnimations) {
        menu.classList.add("transitioning");
    }
    window.addEventListener("click", clickedOutsideMenu)
}

const toggleMenu = () => {
    if (menu.classList.contains("active")) {
        hideMenu();
    }
    else {
        showMenu();
    }
}

const menuTransitionEnd = (e) => {
    if (e.target != menu) {
        return;
    }
    if (window.getComputedStyle(menu).getPropertyValue("height") === "0px") {
        appContainer.classList.remove("menu-shade");
    }
    menu.classList.remove("transitioning");
}

const menuFocusout = (e) => {
    if (!menuItems.includes(e.relatedTarget)) {
        hideMenu();
    }
}

// Menu Click Handler
const goToSettings = (e) => {
    if (menu.classList.contains("transitioning")) {
        return
    }
    changeTab(settings);
    headerButtonStates.setButtonDisabled(menuButton);
    headerButtonStates.setButtonEnabled(backButton);
    headerButtonStates.setButtonDisabled(gotoTopButton);
}
const goToAbout = (e) => {
    if (menu.classList.contains("transitioning")) {
        return
    }
    changeTab(about);
    headerButtonStates.setButtonDisabled(menuButton);
    headerButtonStates.setButtonEnabled(backButton);
    headerButtonStates.setButtonDisabled(gotoTopButton);
}
const toggleLogin = (e) => {
    signOut(auth);
    appContainer.style.display = "none";
    appContainer.style.visibility = "hidden";
}

//If animations enabled handle tabs after animations end
const tabTransitionEnd = (e) => {
    if (e.target === settings || e.target === about) {
        if (window.getComputedStyle(e.target).getPropertyValue("height") !== "0px") {
            appContainer.classList.remove("app-visible");
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
    hideMenu();
    changeTab(todoApp);
    headerButtonStates.setButtonDisabled(backButton);
    headerButtonStates.setButtonEnabled(menuButton);
    toggleGotoTopButton(true);
}

// Goto Top Button
// Show goto-top button if page is scrolled down 
export const toggleGotoTopButton = (back = false) => {
    if (window.scrollY > 0 && document.querySelector(".app-container").classList.contains("app-visible")) {
        if (back === true) {
            headerButtonStates.setButtonEnabled(gotoTopButton, true);
        }
        else {
            headerButtonStates.setButtonEnabledNoDelay(gotoTopButton, true);
        }
    }
    else {
        headerButtonStates.setButtonDisabled(gotoTopButton);
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
    bindButtonLogic(settingsButton, menuButtonStates, goToSettings);
    bindButtonLogic(aboutButton, menuButtonStates, goToAbout);
    bindButtonLogic(toggleLoginButton, menuButtonStates, toggleLogin);
    bindButtonLogic(menuButton, headerButtonStates, toggleMenu);
    bindButtonLogic(gotoTopButton, headerButtonStates, scrollToTop);
    bindButtonLogic(backButton, headerButtonStates, backButtonClicked);
}

export default bindHeader;