const tips = [
  "پرامپت بهتر، پاسخ بهتر؛ جزئیات بیشتری درباره نیاز خود ارائه دهید.",
  "از هوش مصنوعی بخواهید نقش مشخصی مانند برنامه‌نویس، مدرس یا مترجم را برعهده بگیرد.",
  "می‌توانید پاسخ‌ها را به صورت جدول، لیست یا کد درخواست کنید.",
  "برای موضوعات پیچیده، سوال را به چند بخش کوچک‌تر تقسیم کنید.",
  "در صورت ناقص بودن پاسخ، کافی است بنویسید «ادامه بده».",
];

const tipContent = document.querySelector(".tip-text");
const bulletsContainer = document.querySelector(".tips-bullet-container");
const nextTipBtn = document.querySelector(".next-tip");
const previousTipBtn = document.querySelector(".previous-tip");

let currentIndex = 0;

const opPageLoad = () => {
  createBullets();
  setFirstTipContent();
};
const setFirstTipContent = () => {
  tipContent.textContent = tips[0];
};
const nextTipHandler = () => {
  if (currentIndex === tips.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeTipContent();
  moveToNextOrPrevousBullet();
};
const previousTipHandler = () => {
  if (!currentIndex) {
    currentIndex = tips.length - 1;
  } else {
    currentIndex--;
  }
  changeTipContent();
  moveToNextOrPrevousBullet();
};

const changeTipContent = () => {
  tipContent.classList.remove("animate-fadeIn");
  tipContent.classList.add("animate-fadeOut");
  setTimeout(() => {
    tipContent.classList.remove("animate-fadeOut");
    tipContent.classList.add("animate-fadeIn");
    tipContent.textContent = tips[currentIndex];
  }, 200);
};
const moveToNextOrPrevousBullet = () => {
  const bullets = document.querySelectorAll(".tips-bullet");
  document
    .querySelector(".tips-bullet.tips-active")
    .classList.remove("tips-active");
  bullets[currentIndex].classList.add("tips-active");
};
const createBullets = () => {
  tips.forEach((tip, index) => {
    bulletsContainer.insertAdjacentHTML(
      "beforeend",
      `
                <span class="w-2 h-2 rounded-full dark:bg-dark-card bg-light-card transition-colors duration-300 tips-bullet cursor-pointer ${index === 0 ? "tips-active" : ""}" data-index="${index}"></span>

      `,
    );
  });
};
const movetoTipWithBulletIndex = (event) => {
  const bullet = event.target.closest(".tips-bullet");
  const activeBullet = event.target.closest(".tips-bullet.tips-active");
  if (activeBullet) return;
  if (bullet) {
    currentIndex = +event.target.dataset.index;
    changeTipContent();
    moveToNextOrPrevousBullet();
  }
};
window.addEventListener("DOMContentLoaded", opPageLoad);
nextTipBtn.addEventListener("click", nextTipHandler);
previousTipBtn.addEventListener("click", previousTipHandler);
bulletsContainer.addEventListener("click", movetoTipWithBulletIndex);
