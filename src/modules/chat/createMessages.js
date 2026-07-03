import { createTransaction } from "../indexedDB/db";
import Message from "../class/message";
import Chat from "../class/chat";
import sendMessage from "./response";
import { marked } from "marked";
import takeChatsHistoryFromIndexedDB from "./chatHistory";

const sendBtn = document.querySelector(".send-Btn");
const input = document.querySelector(".user-message-input");
const messagesContainer = document.querySelector(".messages-container");
const emptyChatContent = document.querySelector(".empty-chat");

let currentChatId = null;

const messageHandler = () => {
  const isChatStarted = emptyChatContent.classList.contains("flex");
  const userText = input.value;
  const newMessage = new Message(userText, "user");
  createMessges(newMessage, "user");
  showLoader();
  takeAiAnswer(newMessage);
  if (isChatStarted) {
    createAndSaveNewChatInIndexedDB(userText);
    takeCurrentChatHistory(newMessage);
  } else {
    takeCurrentChatHistory(newMessage);
  }

  input.value = "";
  hideEmptyChatContent();
  makeBtnDisable();
};
const takeCurrentChatHistory = async (newMessage) => {
  const tx = await createTransaction("chats", "readwrite");
  const store = tx.objectStore("chats");
  const currentChat = await takeCurrentChatFromIndexDB(store, newMessage);
  addChatsToCurrentChat(currentChat, newMessage, store);
};
const createAndSaveNewChatInIndexedDB = (userText) => {
  const chatTitle = takeTitleFromUserInput(userText);
  const newChat = new Chat(chatTitle);
  currentChatId = newChat.id;
  saveNewChatInIndexedDB(newChat);
  takeChatsHistoryFromIndexedDB();
};
const saveNewChatInIndexedDB = async (newChat) => {
  const transaction = await createTransaction("chats", "readwrite");
  const store = transaction.objectStore("chats");
  const request = store.add(newChat);
  request.addEventListener("success", () => {});
};
const takeTitleFromUserInput = (userText) => {
  const chatTitle = userText.slice(0, 20);
  return `${chatTitle}...`;
};
const takeAiAnswer = async (newMessage) => {
  const response = await sendMessage(newMessage);
  takeCurrentChatHistory(response);
  const isEnglish = processIfAiTextIsEnglish(response);
  hideLoader();
  createMessges(response, "ai", isEnglish);
};

const processIfAiTextIsEnglish = (response) => {
  const englishRegEx = /[a-zA-Z]/g;
  const isEnglish = englishRegEx.test(response.content);
  return isEnglish;
};
const createMessges = (response, role, isEnglish = false) => {
  if (role === "user") {
    messagesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="flex flex-col gap-3 dark:text-dark-text-primary text-light-text-primary max-sm:w-full w-1/2 dark:text-shadow-light-text-primary text-shadow-light-text-primary dark:bg-dark-user-message bg-light-user-message rounded-2xl px-5 pt-5 pb-2 user-message">
        <p class="break-all whitespace-pre-wrap">${response.content}</p>
        <div class="w-full flex gap-1">
          <i class="fa-solid fa-check-double"></i>
          <p class="[direction:ltr] w-24 flex justify-center items-center">${formatDate(response.createdAt)}</p>
        </div>
    </div>
    `,
    );
  } else {
    messagesContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="relative dark:text-dark-text-primary text-light-text-primary [direction:${isEnglish ? "ltr" : "rtl"}] flex gap-2 items-center ai-message">
            <span class="flex items-center justify-center absolute top-1 left-3 dark:bg-dark-bg bg-light-bg shadow-lg px-1 py-1 rounded-2xl">
                <img class="size-11" src="./src/assets/images/sidebar-logo.png" alt="">
            </span>
            <div class="[direction:ltr] ml-20 dark:bg-dark-ai-message max-sm:w-full w-1/2 text-right bg-light-ai-message rounded-2xl px-5 pt-5 pb-2">
                <div>
                    ${parseMarkDown(response.content)}
                </div>
                <div class="mt-5">
                    <p class="w-24 flex justify-center items-center">${formatDate(response.createdAt)}</p>
                </div
            </div>
        </div>
    `,
    );
  }
};
const formatDate = (time) => {
  const date = new Date(time);
  const persianTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
  });

  return persianTime;
};
const makeBtnDisable = () => {
  sendBtn.classList.add("disabled-btn");
  sendBtn.disabled = true;
};
const hideEmptyChatContent = () => {
  emptyChatContent.classList.add("animate-fadeOut");
  setTimeout(() => {
    emptyChatContent.classList.add("hidden");
    emptyChatContent.classList.remove("flex");
    messagesContainer.classList.remove("hidden");
    messagesContainer.classList.add("flex");
  }, 200);
};
const inputHandler = (event) => {
  const { target } = event;
  if (target.value.length >= 1) {
    sendBtn.classList.remove("disabled-btn");
    sendBtn.disabled = false;
  } else {
    sendBtn.classList.add("disabled-btn");
    sendBtn.disabled = true;
  }
};

const showLoader = () => {
  messagesContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="flex dark:text-dark-text-primary text-light-text-primary [direction:ltr] gap-6 items-center ai-message ai-message-loader">
      <span span class="flex items-center justify-center dark:bg-dark-bg bg-light-bg shadow-lg px-1 py-1 rounded-2xl">
        <img class="size-11" src="./src/assets/images/sidebar-logo.png" alt="">
      </span>
      <div class="flex items-center gap-8 ml-5">
          <div class="loader aspect-square rounded-full w-2.5 animate-loader"></div>
              در حال پردازش
      </div>
    </div>
    `,
  );
};
const hideLoader = () => {
  document.querySelector(".ai-message-loader").remove();
};
const parseMarkDown = (response) => {
  const content = marked.parse(response);
  return content;
};
const takeCurrentChatFromIndexDB = (store) => {
  return new Promise((resolve, reject) => {
    const data = store.get(currentChatId);
    data.addEventListener("error", (event) => {
      reject(event.target.result);
    });
    data.addEventListener("success", (event) => {
      resolve(event.target.result);
    });
  });
};
const addChatsToCurrentChat = (obj, newMessage, store) => {
  const newChatToSave = obj;
  newChatToSave.messages.push(newMessage);
  console.log(newChatToSave);
  store.put(newChatToSave);
};

input.addEventListener("input", inputHandler);
sendBtn.addEventListener("click", messageHandler);

export {
  hideEmptyChatContent,
  createMessges,
  takeAiAnswer,
  showLoader,
  formatDate,
};
