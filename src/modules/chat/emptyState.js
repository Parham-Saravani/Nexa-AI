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
const questionContainer = document.querySelector('.short-questions')
const createQuestions = () => {
    popularQuestions.forEach(question => {
        questionContainer.insertAdjacentHTML('beforeend',
        `
        <div class="dark:bg-dark-input-bg w-105 border border-light-input-border dark:border-dark-input-border px-3 py-6 dark:text-dark-text-secondary text-light-text-secondary flex justify-between items-center rounded-2xl transition-transform duration-300 hover:scale-101 cursor-pointer">
            <div class="flex w-[90%] items-center gap-3">
                <i class="${question.icon}"></i>
                <p class="text-[13px]">${question.question}</p>
            </div>
            <i class="fa-solid fa-arrow-left"></i>
        </div>
        `
        )
    })
}

window.addEventListener('DOMContentLoaded', createQuestions)