import { addInput } from "./addTodo/addTodo";
import { deleteAllButton, deleteCompletedButton } from "./footer/footer";
import "./appMain.css";

const appMain = document.querySelector(".app-main");
export const todoList = document.querySelector(".todolist");

export const showApp = () => {
    appMain.classList.add("active");
}
export const hideApp = () => {
    appMain.classList.remove("active");
}

// Toggle list visibility depending on list having any items
export const updateListVisibility = () => {
    if (todoCount === 0) {
        appMain.classList.remove("list-visible");
        deleteAllButton.setAttribute("tabindex", "-1");
        deleteCompletedButton.setAttribute("tabindex", "-1");
        addInput.focus();
    }
    else {
        appMain.classList.add("list-visible");
        deleteAllButton.setAttribute("tabindex", "0");
        deleteCompletedButton.setAttribute("tabindex", "0");
    }
}