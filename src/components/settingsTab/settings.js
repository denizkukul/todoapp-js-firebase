import { ref, set } from "firebase/database";
import { db, currentUID } from "../../index";
import { options, saveSettingsButton, todoApp, backButton, menuButton } from "../../domShortcuts";
import { headerButtonStates, optionButtonStates, textButtonStates } from "../../functions/buttonTypes";
import { toggleGotoTopButton } from "../header/header";
import changeTab from "../../functions/changeTab";
import bindButtonLogic from "../../functions/bindButtonLogic";
import "./settings.css";

var userSettingsUpdate = {};

const toggleOption = (e) => {
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
    changeTab(todoApp);
    headerButtonStates.setButtonDisabled(backButton);
    headerButtonStates.setButtonEnabled(menuButton);
    toggleGotoTopButton(true);
}

const bindSettings = () => {
    options.forEach((option) => {
        let optionName = option.dataset.optionName;
        if (userSettings[optionName]) {
            option.classList.add("on");
        }
        bindButtonLogic(option, optionButtonStates, toggleOption);
    })
    bindButtonLogic(saveSettingsButton, textButtonStates, saveSettings);
}

export default bindSettings;