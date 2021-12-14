import { hideAppContainer, hideShadeMenu, showShadeMenu } from "../../../appContainer/appContainer";
import { showAbout } from "../../aboutTab/about";
import { showSettings } from "../../settingsTab/settings";
import { signOut } from "firebase/auth";
import { auth } from "../../../../index";
import { hideMenuButton, hideScrollTopButton, showBackButton } from "../header";
import bindButton from "../../../bindButton";
import "./menu.css";

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
const settingsButton = document.querySelector(".settings-button");
const aboutButton = document.querySelector(".about-button");
const toggleLoginButton = document.querySelector(".toggle-login-button");
const menuItems = [menuButton, settingsButton, aboutButton, toggleLoginButton];

// Menu
const clickedOutsideMenu = (e) => {
    let target = e.target.closest("button");
    if (!menuItems.includes(target)) {
        window.removeEventListener("click", clickedOutsideMenu);
        hideMenu();
    }
}

export const hideMenu = () => {
    window.removeEventListener("click", clickedOutsideMenu);
    menuButton.removeEventListener("blur", menuFocusout);
    menu.removeEventListener("focusout", menuFocusout);
    menu.classList.remove("active");
    menuItems.forEach(button => button !== menuButton ? button.setAttribute("tabindex", "-1") : "");
    if (!userSettings.enableAnimations) {
        hideShadeMenu();
    }
}

const showMenu = () => {
    window.addEventListener("click", clickedOutsideMenu)
    menuButton.addEventListener("blur", menuFocusout);
    menu.addEventListener("focusout", menuFocusout)
    menu.classList.add("active");
    showShadeMenu();
    if (!userSettings.enableAnimations) {
        menuItems.forEach(button => button !== menuButton ? button.setAttribute("tabindex", "3") : "");
        return
    }
}

export const toggleMenu = () => {
    if (menu.classList.contains("active")) {
        hideMenu();
    }
    else {
        showMenu();
    }
}

const menuTransitionEnd = (e) => {
    if (e.target != menu) return;
    if (window.getComputedStyle(menu).getPropertyValue("height") === "0px") {
        hideShadeMenu();
        return
    }
    menuItems.forEach(button => button !== menuButton ? button.setAttribute("tabindex", "3") : "");
}

const menuFocusout = (e) => {
    if (!menuItems.includes(e.relatedTarget)) {
        hideMenu();
    }
}

// Menu Items
const settingsButtonClicked = (e) => {
    if (e.currentTarget.getAttribute("tabindex") === "-1") return;
    showSettings();
    hideMenuButton();
    hideScrollTopButton();
    showBackButton();
}
const aboutButtonClicked = (e) => {
    if (e.currentTarget.getAttribute("tabindex") === "-1") return;
    showAbout();
    hideMenuButton();
    hideScrollTopButton();
    showBackButton();
}

const toggleLogin = (e) => {
    if (e.currentTarget.getAttribute("tabindex") === "-1") return;
    signOut(auth);
    hideAppContainer();
}

const bindMenu = () => {
    menu.addEventListener("transitionend", menuTransitionEnd);
    bindButton(settingsButton, settingsButtonClicked);
    bindButton(aboutButton, aboutButtonClicked);
    bindButton(toggleLoginButton, toggleLogin);
}

export default bindMenu;