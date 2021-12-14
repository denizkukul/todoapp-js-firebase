import { hideAbout } from "../aboutTab/about";
import { hideSettings } from "../settingsTab/settings";
import { hideMenu, toggleMenu } from "./menu/menu";
import bindButton from "../../bindButton";
import "./header.css";

const menuButton = document.querySelector(".menu-button");
const scrollTopButton = document.querySelector(".scroll-top-button");
const backButton = document.querySelector(".back-button");

// Header
// Menu Button
export const showMenuButton = () => {
    menuButton.classList.add("active");
    menuButton.setAttribute("tabindex", "1");
}
export const hideMenuButton = () => {
    menuButton.classList.remove("active");
    menuButton.setAttribute("tabindex", "-1");
}
// Back Button
export const showBackButton = () => {
    backButton.classList.add("active");
    backButton.setAttribute("tabindex", "1");
}
export const hideBackButton = () => {
    backButton.classList.remove("active");
    backButton.setAttribute("tabindex", "-1");
}

const backButtonClicked = () => {
    showMenuButton();
    showScrollTopButton();
    hideMenu();
    hideSettings();
    hideAbout();
    hideBackButton();
}

// Goto Top Button
// Show scroll-top button if page is scrolled down 
export const showScrollTopButton = () => {
    scrollTopButton.classList.add("active");
}
export const hideScrollTopButton = () => {
    scrollTopButton.classList.remove("active");
}

const toggleScrollTopButton = () => {
    if (window.scrollY > 0) {
        scrollTopButton.classList.add("scrolled");
    }
    else {
        scrollTopButton.classList.remove("scrolled");
    }
}

// Goto top button scroll to top
const scrollToTop = () => {
    window.scrollTo(0, 0);
}

const bindHeader = () => {
    document.addEventListener("scroll", toggleScrollTopButton);
    bindButton(scrollTopButton, scrollToTop);
    bindButton(menuButton, toggleMenu);
    bindButton(backButton, backButtonClicked);
}

export default bindHeader;