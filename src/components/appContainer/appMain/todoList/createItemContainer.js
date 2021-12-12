// Create an item-container
const createItemContainer = (id, initial = false) => {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    !initial ? itemContainer.classList.add("new-item") : "";
    itemContainer.setAttribute("id", id);
    return itemContainer;
}

export default createItemContainer;