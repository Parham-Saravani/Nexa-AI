const newChatBtn = document.querySelector(".new-chat");
const emptyChatContent = document.querySelector(".empty-chat");
const messagesContainer = document.querySelector(".messages-container");

const createNewChat = () => {
  const isEmptyStateShowing = emptyChatContent.classList.contains("flex");
  if (!isEmptyStateShowing) {
    messagesContainer.innerHTML = '';
    document.querySelector('.chat-history-items.active-chat')?.classList.remove('active-chat');

    messagesContainer.classList.add("hidden");
    emptyChatContent.classList.remove("hidden");
    emptyChatContent.classList.add("flex");
    emptyChatContent.classList.remove("animate-fadeOut");
    emptyChatContent.classList.add("animate-fadeIn");
  }
};

newChatBtn.addEventListener("click", createNewChat);
