const menuItems = document.querySelectorAll(".menu-items");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuOpenBtn = document.querySelector(".mobile-menu-opener");
const mobileMenuCloserBtn = document.querySelector(".close-mobile-menu");

const activeClickedMenuItem = (event) => {
  const currentActiveItem = event.target.closest(".menu-items.active");
  if (currentActiveItem) return;
  document.querySelector(".menu-items.active").classList.remove("active");
  event.target.classList.add("active");
};
const showModileMenu = () => {
  mobileMenu.classList.remove('hide')
}
const hideMobileMenu = () => {
  mobileMenu.classList.add('hide')
}
menuItems.forEach((item) => {
  item.addEventListener("click", activeClickedMenuItem);
});
mobileMenuOpenBtn.addEventListener('click', showModileMenu)
mobileMenuCloserBtn.addEventListener('click', hideMobileMenu)