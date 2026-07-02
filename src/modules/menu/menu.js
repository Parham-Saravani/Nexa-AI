const menuItems = document.querySelectorAll(".menu-items");

const activeClickedMenuItem = (event) => {
    const currentActiveItem = event.target.closest('.menu-items.active')
    if(currentActiveItem) return;
    document.querySelector('.menu-items.active').classList.remove('active')
    event.target.classList.add('active')
};

menuItems.forEach((item) => {
  item.addEventListener("click", activeClickedMenuItem);
});

