import "./progressIndicator.css";
const progressIndicator = document.querySelector(".progress");
export const showProgressIndicator = () => {
    progressIndicator.style.display = "flex";
}
export const hideProgressIndicator = () => {
    progressIndicator.style.display = "none";
}
