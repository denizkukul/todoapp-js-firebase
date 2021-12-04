import { appContainer, todoApp, settings } from "../domShortcuts";
import updateOptionButtons from "./updateOptionButtons";

// Changes tabs between settings, about and app tabs.
const changeTab = (tab) => {
    if (tab === todoApp) {
        //return to main tab
        if (!userSettings.enableAnimations) {
            appContainer.classList.remove("tab-shade");
            updateOptionButtons();
        }
        appContainer.classList.remove("settings-visible");
        appContainer.classList.remove("about-visible");
        appContainer.classList.add("app-visible");
    }
    else {
        //about or settings tabs
        appContainer.classList.add("tab-shade");
        if (tab === settings) {
            appContainer.classList.add("settings-visible");
        }
        else {
            appContainer.classList.add("about-visible");
        }

        if (!userSettings.enableAnimations) {
            appContainer.classList.remove("app-visible");
        }
    }
}

export default changeTab;