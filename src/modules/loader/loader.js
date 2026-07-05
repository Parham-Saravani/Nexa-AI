const loader = document.querySelector(".page-loader");

const showContnet = () => {
  loader.classList.add("hidden");
};

window.addEventListener("load", showContnet);
