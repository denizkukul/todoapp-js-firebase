import { ref, set } from "firebase/database";
import { db, currentUID } from "../../../index";
import { hideBackButton, showMenuButton, showScrollTopButton } from "../header/header";
import { showShadeTab, hideShadeTab } from "../appContainer";
import { showApp, hideApp } from "../appMain/appMain";
import bindButton from "../../bindButton";
import "./settings.css";
import { hideMenu } from "../header/menu/menu";

const saveSettingsButton = document.querySelector(".save-settings-button");
const settingsTab = document.querySelector(".settings");
const options = Array.from(document.querySelectorAll(".option-button"));
const titleSettings = document.querySelector(".title-settings");
const titleTodolist = document.querySelector(".title-todolist");
var userSettingsUpdate = {};

// Settings Tab
export const showSettings = () => {
    userSettingsUpdate = {};
    showShadeTab();
    titleTodolist.classList.remove("active");
    settingsTab.classList.add("active");
    titleSettings.classList.add("active");
    if (!userSettings.enableAnimations) {
        options.forEach(button => button.setAttribute("tabindex", "2"));
        hideApp();
    }
}
export const hideSettings = () => {
    settingsTab.classList.remove("active");
    titleSettings.classList.remove("active");
    titleTodolist.classList.add("active");
    showApp();
    hideShadeTab();
    options.forEach(button => button.setAttribute("tabindex", "-1"))
    if (!userSettings.enableAnimations) {
        showApp();
        updateOptions();
    }
}

const toggleOption = (e) => {
    if (e.currentTarget.getAttribute("tabindex") === "-1") return;
    e.currentTarget.classList.toggle("on");
    let optionName = e.currentTarget.dataset.optionName;
    userSettingsUpdate[optionName] = e.currentTarget.classList.contains("on");
}

const saveSettings = () => {
    userSettings = { ...userSettings, ...userSettingsUpdate };
    let settingsRef = ref(db, `${currentUID}/settings`);
    set(settingsRef, userSettings);
    transitionTime = userSettings.enableAnimations ? defaultTransitionTime : 0;
    document.documentElement.style.setProperty("--transition-time", `${transitionTime}ms`);
    showMenuButton();
    showScrollTopButton();
    hideBackButton();
    hideSettings();
    hideMenu();
}

const settingsTransitionEnd = (e) => {
    if (e.target !== settingsTab) return;
    if (window.getComputedStyle(e.target).getPropertyValue("height") !== "0px") {
        hideApp();
        options.forEach(button => button.setAttribute("tabindex", "2"));
    }
    else {
        showApp();
        updateOptions();
    }
}

export const updateOptions = () => {
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

const bindSettings = () => {
    options.forEach(option => {
        bindButton(option, toggleOption);
    })
    bindButton(saveSettingsButton, saveSettings);
    settingsTab.addEventListener("transitionend", settingsTransitionEnd);
}

export default bindSettings;