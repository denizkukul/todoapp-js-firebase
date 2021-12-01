import { db, currentUID } from "./index";
import { ref, get } from "firebase/database";
import { progresIndicator, appContainer, todoList } from "./domShortcuts";
import updateListVisibility from "./functions/updateListVisibility";
import createItemContainer from "./functions/createItemContainer";
import createTodo from "./components/todoList/createTodo";
import bindApp from "./components/bindApp";
import "./app.css"

export const startApp = () => {
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
                    let container = createItemContainer(todo);
                    let item = createTodo(todos[todo].value, todos[todo].completed);
                    container.appendChild(item);
                    todoList.appendChild(container);
                    todoCount++;
                }
            }
            else {
                todoCount = 0;
            }
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            // Chage visible tab from progress-indicator to app
            appContainer.style.display = "block";
            appContainer.style.visibility = "visible";
            appContainer.classList.add("app-visible");
            progresIndicator.style.display = "none";
            updateListVisibility();
            setTimeout(() => {
                transitionTime = userSettings.enableAnimations ? defaultTransitionTime : 0;
                document.documentElement.style.setProperty("--transition-time", `${transitionTime}ms`);
                bindApp();
            }, 200)
        })
}

export const clearApp = () => {
    todoList.innerHTML = "";
    document.documentElement.style.setProperty("--transition-time", `${defaultTransitionTime}`);
    updateListVisibility();
}