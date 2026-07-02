const toggleInput = document.querySelector(".theme-checkbox");
const themeSwith = document.querySelector(".theme-toggle");

let isDarkMode = false;
const applyTheme = () => {
  const themeStatus = JSON.parse(localStorage.getItem("isDarkMode")) || false;
  if (themeStatus) {
    themeSwith.classList.add("theme-active");
    darkTheme();
    isDarkMode = true;
  } else {
    lightTheme;
    isDarkMode = false;
  }
};
const changeTheme = (event) => {
  if (!isDarkMode) {
    darkTheme();
    isDarkMode = true;
    themeSwith.classList.add("theme-active");
  } else {
    lightTheme();
    isDarkMode = false;
    themeSwith.classList.remove("theme-active");
  }
};
toggleInput.addEventListener("click", changeTheme);
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
export default applyTheme;
