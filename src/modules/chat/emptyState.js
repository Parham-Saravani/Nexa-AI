import {
  createAndSaveNewChatInIndexedDB,
  hideEmptyChatContent,
  createMessges,
  takeAiAnswer,
  showLoader,
  chatHistoryHandler,
} from "./createMessages.js";
import Message from "../class/message.js";
const emptyChatContent = document.querySelector(".empty-chat");

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
const input = document.querySelector(".user-message-input");

const createQuestions = () => {
  popularQuestions.forEach((question, index) => {
    questionContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="dark:bg-dark-input-bg max-xl:w-120 max-md:w-71 max-sm:w-full w-105 border border-light-input-border dark:border-dark-input-border max-xl:py-4 max-sm:py-3 px-3 py-6 dark:text-dark-text-secondary text-light-text-secondary flex justify-between items-center rounded-2xl transition-transform duration-300 hover:scale-101 popular-questions">
            <div class="flex w-[90%] items-center gap-3">
                <i class="${question.icon}"></i>
                <p class="text-[13px] max-xl:text-[15px] max-md:text-[10px] popular-question-text cursor-pointer" data-index="${index}">${question.question}</p>
            </div>
            <i class="fa-solid fa-arrow-left cursor-pointer question-arrow-icon" data-index="${index}"></i>
        </div>
        `,
    );
  });
};

const popularQuestionsClickHandler = (event) => {
  const isChatStarted = emptyChatContent.classList.contains("flex");
  let content = null;
  const question = event.target.closest(".popular-question-text");
  const questionArrowIcon = event.target.closest(".question-arrow-icon");

  if (!question && !questionArrowIcon) {
    return;
  } else if (question || questionArrowIcon) {
    input.value = "";
    const index = event.target.dataset.index;
    content = popularQuestions[index].question;
  }
  hideEmptyChatContent();
  const newMessage = new Message(content, "user");
  createMessges(newMessage, "user");
  showLoader();
  if (isChatStarted) {
    createAndSaveNewChatInIndexedDB(content);
    chatHistoryHandler(newMessage);
  }
  takeAiAnswer(newMessage);
};
window.addEventListener("DOMContentLoaded", createQuestions);
questionContainer.addEventListener("click", popularQuestionsClickHandler);
