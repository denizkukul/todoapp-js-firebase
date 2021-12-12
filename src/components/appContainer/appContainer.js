import "./appContainer.css";
const appContainer = document.querySelector(".app-container");
const shade = document.querySelector(".transition-shade");

export const showAppContainer = () => {
    appContainer.style.display = "flex";
}
export const hideAppContainer = () => {
    appContainer.style.display = "none";
}
export const showShadeMenu = () => {
    shade.classList.add("menu-active");
}
export const hideShadeMenu = () => {
    shade.classList.remove("menu-active");
}
export const showShadeTab = () => {
    shade.classList.add("tab-active");
}
export const hideShadeTab = () => {
    shade.classList.remove("tab-active");
}