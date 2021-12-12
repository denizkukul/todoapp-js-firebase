import { db, currentUID } from "./index";
import { ref, get } from "firebase/database";
import { hideApp, showApp, updateListVisibility, todoList } from "./components/appContainer/appMain/appMain";
import { hideAppContainer, hideShadeMenu, showAppContainer } from "./components/appContainer/appContainer";
import { hideProgressIndicator } from "./components/progressIndicator/progressIndicator";
import { showSignIn } from "./components/signInTab/signIn";
import { updateOptions } from "./components/appContainer/settingsTab/settings";
import createItemContainer from "./components/appContainer/appMain/todoList/createItemContainer";
import createTodo from "./components/appContainer/appMain/todoList/createTodo";

export const getUserData = () => {
    //Get user data
    let userDataRef = ref(db, currentUID);
    get(userDataRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val();
                let todos = data.todos;
                if (data.settings) {
                    userSettings = data.settings;
                }
                // Create todos
                for (const todo in todos) {
                    let container = createItemContainer(todo, true);
                    let item = createTodo(todos[todo].value, todos[todo].completed, true);
                    container.appendChild(item);
                    todoList.appendChild(container);
                    todoCount++;
                }
            }
            else {
                todoCount = 0;
            }
        })
        .then(() => {
            // Chage visible tab from progress-indicator to app
            updateOptions();
            updateListVisibility();
            showAppContainer();
            showApp();
            hideProgressIndicator();
            setTimeout(() => {
                transitionTime = userSettings.enableAnimations ? defaultTransitionTime : 0;
                document.documentElement.style.setProperty("--transition-time", `${transitionTime}ms`);
            }, 200)
        })
        .catch((error) => {
            alert(error);
            clearUserData();
        })
}

export const clearUserData = () => {
    showSignIn();
    hideAppContainer();
    hideApp();
    hideShadeMenu();
    todoList.innerHTML = "";
    document.documentElement.style.setProperty("--transition-time", `${defaultTransitionTime}ms`);
    updateListVisibility();
}