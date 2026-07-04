const toggleInput = document.querySelector(".theme-checkbox");
const themeSwith = document.querySelector(".theme-toggle");

const applyTheme = () => {
  const themeStatus = JSON.parse(localStorage.getItem("isDarkMode")) || false;
  if (themeStatus) {
    themeSwith.classList.add("theme-active");
    darkTheme();
    toggleInput.checked = true;
  } else {
    toggleInput.checked = false;
    lightTheme;
  }
};
const changeTheme = (event) => {
  if (toggleInput.checked) {
    darkTheme();
    themeSwith.classList.add("theme-active");
  } else {
    lightTheme();
    themeSwith.classList.remove("theme-active");
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

toggleInput.addEventListener("click", changeTheme);

export default applyTheme;
