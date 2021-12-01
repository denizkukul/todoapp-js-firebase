import bindTouchAndClick from "../../functions/bindTouchAndClick";
import changeTab from "../../functions/changeTab";
import { ref, set } from "firebase/database";
import { db, currentUID } from "../../index";
import { options, saveSettingsButton, todoApp } from "../../domShortcuts";
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
}

const bindSettings = () => {
    options.forEach((option) => {
        let optionName = option.dataset.optionName;
        if (userSettings[optionName]) {
            option.classList.add("on");
        }
        bindTouchAndClick(option, toggleOption);
    })
    bindTouchAndClick(saveSettingsButton, saveSettings);
}

export default bindSettings;