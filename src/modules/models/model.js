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
  const modelMenuItem = event.target.closest(".model-menu-items");
  if (modelMenuItem || modelMenu) return;
  if (!isOpen && !openModelMenu) {
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
  hideModalMenu();
  isOpen = false;
};
const changeCurrentModelText = (model) => {
  currentModel.innerHTML = "";
  currentModel.insertAdjacentHTML(
    "beforeend",
    `
        <i class="fa-solid fa-brain text-[18px] absolute top-3.5 left-2"></i>
        <p class="ml-5">${model}</p>
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
currentModel.addEventListener("click", openModelMenu);
document.addEventListener("click", closeModelMenuOnUserClick);
modelMenuItems.forEach((item) => {
  item.addEventListener("click", changeModel);
});
