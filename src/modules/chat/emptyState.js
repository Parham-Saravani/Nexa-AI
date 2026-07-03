import {
  hideEmptyChatContent,
  createMessges,
  takeAiAnswer,
  showLoader,
} from "./createMessages";
import Message from "./message";

const popularQuestions = [
  {
    icon: "fa-solid fa-code",
    question: "برای یادگیری برنامه‌نویسی از کجا شروع کنم؟",
  },
  {
    icon: "fa-solid fa-dumbbell",
    question: "یک برنامه ورزشی مناسب برای خانه پیشنهاد بده.",
  },
  {
    icon: "fa-solid fa-money-bill-trend-up",
    question: "چطور می‌توانم درآمد دلاری داشته باشم؟",
  },
  {
    icon: "fa-solid fa-plane-departure",
    question: "برای مهاجرت چه مهارت‌هایی ارزشمندتر هستند؟",
  },
  {
    icon: "fa-solid fa-lightbulb",
    question: "یک ایده کسب‌وکار با سرمایه کم پیشنهاد بده.",
  },
  {
    icon: "fa-solid fa-robot",
    question: "هوش مصنوعی در آینده چه شغل‌هایی را تغییر خواهد داد؟",
  },
];
const questionContainer = document.querySelector(".short-questions");
const emptyChat = document.querySelector(".empty-chat");

const createQuestions = () => {
  popularQuestions.forEach((question, index) => {
    questionContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="dark:bg-dark-input-bg max-sm:w-full w-105 border border-light-input-border dark:border-dark-input-border max-sm:py-3 px-3 py-6 dark:text-dark-text-secondary text-light-text-secondary flex justify-between items-center rounded-2xl transition-transform duration-300 hover:scale-101 popular-questions">
            <div class="flex w-[90%] items-center gap-3">
                <i class="${question.icon}"></i>
                <p class="text-[13px] popular-question-text cursor-pointer" data-index="${index}">${question.question}</p>
            </div>
            <i class="fa-solid fa-arrow-left cursor-pointer question-arrow-icon" data-index="${index}"></i>
        </div>
        `,
    );
  });
};

const popularQuestionsClickHandler = (event) => {
  let content = null;
  const question = event.target.closest(".popular-question-text");
  const questionArrowIcon = event.target.closest(".question-arrow-icon");

  if (!question && !questionArrowIcon) {
    return;
  } else if (question || questionArrowIcon) {
    const index = event.target.dataset.index;
    content = popularQuestions[index].question;
    console.log(content);
  }
  hideEmptyChatContent();
  const newMessage = new Message(content, "user");
  createMessges(newMessage, "user");
  showLoader();
  takeAiAnswer(newMessage);
};
window.addEventListener("DOMContentLoaded", createQuestions);
questionContainer.addEventListener("click", popularQuestionsClickHandler);
