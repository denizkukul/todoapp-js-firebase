import bindAddTodo from "./appContainer/appMain/addTodo/addTodo";
import bindFooter from "./appContainer/appMain/footer/footer";
import bindHeader from "./appContainer/header/header";
import bindModal from "./appContainer/modal/modal";
import bindSettings from "./appContainer/settingsTab/settings";
import bindSignIn from "./signInTab/signIn";
import bindMenu from "./appContainer/header/menu/menu";
import bindAbout from "./appContainer/aboutTab/about";

const bindAll = () => {
    bindHeader();
    bindMenu();
    bindAddTodo();
    bindSignIn();
    bindModal();
    bindSettings();
    bindAbout();
    bindFooter();
}

export default bindAll;
