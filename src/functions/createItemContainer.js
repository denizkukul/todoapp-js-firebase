// Create an item-container
const createItemContainer = (id) => {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container");
    itemContainer.setAttribute("id", id);
    return itemContainer;
}

export default createItemContainer;