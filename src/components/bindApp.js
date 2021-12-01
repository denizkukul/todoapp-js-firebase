import bindAddTodo from "./addTodo/addTodo";
import bindFooter from "./footer/footer";
import bindHeader from "./header/header";
import bindModal from "./modal/modal";
import bindSettings from "./settingsTab/settings";
import bindSignInButtons from "./signIn/signIn";

const bindApp = () => {
    bindAddTodo();
    bindFooter();
    bindHeader();
    bindModal();
    bindSettings();
}

export default bindApp;
