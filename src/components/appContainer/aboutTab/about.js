import { showShadeTab, hideShadeTab } from "../appContainer";
import { showApp, hideApp } from "../appMain/appMain"
import "./about.css";
const aboutTab = document.querySelector(".about");
const titleAbout = document.querySelector(".title-about");
const titleTodolist = document.querySelector(".title-todolist");

export const showAbout = () => {
    showShadeTab();
    aboutTab.classList.add("active");
    titleAbout.classList.add("active");
    titleTodolist.classList.remove("active");
}
export const hideAbout = () => {
    aboutTab.classList.remove("active");
    titleAbout.classList.remove("active");
    titleTodolist.classList.add("active");
    showApp();
    if (!userSettings.enableAnimations) {
        hideShadeTab();
    }
}

const aboutTransitionEnd = (e) => {
    if (e.target !== aboutTab) return;
    if (window.getComputedStyle(e.target).getPropertyValue("height") !== "0px") {
        hideApp();
    }
    else {
        showApp();
        hideShadeTab();
    }
}

const bindAbout = () => {
    aboutTab.addEventListener("transitionend", aboutTransitionEnd);
}

export default bindAbout;