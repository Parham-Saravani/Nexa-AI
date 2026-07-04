const currentModel = document.querySelector(".current-model");
const modelMenu = document.querySelector(".model-menu");
const modelMenuItems = document.querySelectorAll(".model-menu-items");
let isOpen = false;
const openModelMenu = () => {
  if (!isOpen) {
    isOpen = true;
    showModelMenu();
  } else {
    isOpen = false;
    hideModalMenu();
  }
};

const showModelMenu = () => {
  modelMenu.classList.remove("animate-fadeOut");
  modelMenu.classList.remove("hidden");
  modelMenu.classList.remove("opacity-0");
  modelMenu.classList.add("animate-fadeIn");
};
const hideModalMenu = () => {
  modelMenu.classList.remove("animate-fadeIn");
  modelMenu.classList.add("animate-fadeOut");
  setTimeout(() => {
    modelMenu.classList.add("hidden");
    modelMenu.classList.add("opacity-0");
  }, 300);
};

const closeModelMenuOnUserClick = (event) => {
  const openModelMenu = event.target.closest(".current-model");
  const modelMenu = event.target.closest(".model-menu");
  const modelMenuItem = event.target.closest(".model-menu-items");

  if (modelMenuItem || modelMenu) return;
  if (!openModelMenu) {
    hideModalMenu();
    isOpen = false;
  }
};
const changeModel = (event) => {
  const activeItem = event.target.closest(".model-menu-items.active");
  if (activeItem) return;
  removeActiveClassFromPreviousItem();
  changeCurrentModelText(event.target.dataset.model);
  event.target.classList.add("active");
  saveCurrentModalInLocalStorage(event.target.dataset.model);
  hideModalMenu();
  isOpen = false;
};
const changeCurrentModelText = (model) => {
  currentModel.innerHTML = "";
  currentModel.insertAdjacentHTML(
    "beforeend",
    `
        <i class="fa-solid fa-brain text-[18px] absolute top-3.5 left-3"></i>
        <p class="ml-10">${model}</p>
    `,
  );
};
const removeActiveClassFromPreviousItem = () => {
  modelMenuItems.forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  });
};
const saveCurrentModalInLocalStorage = (model) => {
  localStorage.setItem("model", model === "Fast" ? "fast" : "default");
};

const syncModelBasedOnLocalStorage = () => {
  const localStorageModel = localStorage.getItem("model");

  if (localStorageModel) {
    const model =
      localStorageModel[0].toUpperCase() + localStorageModel.slice(1);
    changeCurrentModelText(model);
    removeActiveClassFromPreviousItem();
    document.querySelector(`[data-model=${model}]`).classList.add("active");
  }
};

const setModel = () => {
  const localStorageModel = localStorage.getItem("model");
  if (localStorageModel) {
    return localStorageModel;
  } else {
    return "default";
  }
};

window.addEventListener("DOMContentLoaded", syncModelBasedOnLocalStorage);
currentModel.addEventListener("click", openModelMenu);
document.addEventListener("click", closeModelMenuOnUserClick);
modelMenuItems.forEach((item) => {
  item.addEventListener("click", changeModel);
});

export default setModel;
