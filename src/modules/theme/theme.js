const toggleInput = document.querySelector(".theme-checkbox");
const mobileToggleInput = document.querySelector(".mobile-menu-theme-checkbox");
const themeSwith = document.querySelector(".theme-toggle");
const mobileThemeSwith = document.querySelector(".mobile-theme-toggle");

const applyTheme = () => {
  const themeStatus = JSON.parse(localStorage.getItem("isDarkMode")) || false;
  if (themeStatus) {
    themeSwith.classList.add("theme-active");
    mobileThemeSwith.classList.add("mobile-theme-active");
    darkTheme();
    toggleInput.checked = true;
    mobileToggleInput.checked = true;
  } else {
    toggleInput.checked = false;
    mobileToggleInput.checked = false;
    lightTheme;
  }
};
const changeTheme = (event) => {
  if (toggleInput.checked) {
    darkTheme();
    themeSwith.classList.add("theme-active");
    mobileThemeSwith.classList.add("mobile-theme-active");
  } else {
    lightTheme();
    themeSwith.classList.remove("theme-active");
    mobileThemeSwith.classList.remove("mobile-theme-active");
  }
};
const darkTheme = () => {
  document.documentElement.classList.add("dark");
  saveThemeInLocalStorage("true");
};
const lightTheme = () => {
  document.documentElement.classList.remove("dark");
  saveThemeInLocalStorage("false");
};

const saveThemeInLocalStorage = (theme) => {
  localStorage.setItem("isDarkMode", theme);
};

const mobileThemeHandler = () => {  
  if (mobileToggleInput.checked) {
    darkTheme();
    mobileThemeSwith.classList.add("mobile-theme-active");
    themeSwith.classList.add("theme-active");
  } else {
    lightTheme();
    mobileThemeSwith.classList.remove("mobile-theme-active");
    themeSwith.classList.remove("theme-active");
  }
};

toggleInput.addEventListener("click", changeTheme);
mobileToggleInput.addEventListener("click", mobileThemeHandler);

export default applyTheme;
