import { createTransaction } from "../indexedDB/db.js";
import {
  createMessges,
  formatDate,
  takeCurrentChatFromIndexDB,
} from "./createMessages";
import { hideEmptyChatContent } from "./createMessages";

const recentChatsContainer = document.querySelectorAll(".recent-chats-data");
const messagesContainer = document.querySelector(".messages-container");

const takeChatsHistoryFromIndexedDB = async () => {
  const transaction = await createTransaction("chats", "readonly");
  const store = transaction.objectStore("chats");

  const chats = await takeAllChats(store);
  createChastsHistory(chats);
};
const takeAllChats = (store) => {
  return new Promise((resolve, reject) => {
    const data = store.getAll();
    data.addEventListener("error", (event) => {
      reject(event.target.result);
    });
    data.addEventListener("success", (event) => {
      resolve(event.target.result);
    });
  });
};
const createChastsHistory = (data) => {
  if (data.lenght === 0) {
    shwoEmptyHistoryElement();
  } else {
    recentChatsContainer.forEach((container) => {
      container.innerHTML = "";
      data.reverse().forEach((item) => {
        container.insertAdjacentHTML(
          "beforeend",
          `
        <div class="max-xl:text-xs ml-2 flex justify-between items-center rounded-2xl max-sm:py-3 py-4.5 px-3.5 dark:text-dark-text-secondary text-light-text-secondary transition-colors duration-300 dark:hover:bg-dark-bg hover:bg-light-bg cursor-pointer chat-history-items" data-id="${item.id}">
            <p class="font-medium line-clamp-1 max-sm:text-xs w-45 max-sm:w-33 chat-summary">${item.title}</p>
            <p class="[direction:ltr] text-xs max-sm:text-[9px]  chat-created-time">${formatDate(item.createAt)}</p>
        </div>
        `,
        );
      });
    });
  }
};
const shwoEmptyHistoryElement = () => {
  recentChatsContainer.forEach((container) => {
    container.insertAdjacentHTML(
      "afterbegin",
      `
    <p class="text-center text-[14px] dark:bg-dark-bg dark:text-dark-text-secondary text-light-text-secondary border-dashed border-2 dark:border-dark-border border-light-border bg-light-bg rounded-2xl py-4 empty-history">
       هنوز هیچ گفتگویی ندارید <br />اولین پیام خود را ارسال کنید.
    </p>
    `,
    );
  });
};
const hideEmptyHistoryElement = () => {
  historyEmptyElement.classList.add("hidden");
};

const changeChatsContent = async (event) => {
  const chatHistoryItem = event.target.closest(".chat-history-items");
  const curentActiveChat = event.target.closest(
    ".chat-history-items.active-chat",
  );
  if (curentActiveChat) return;
  if (chatHistoryItem) {
    document
      .querySelector(".chat-history-items.active-chat")
      ?.classList.remove("active-chat");
    chatHistoryItem.classList.add("active-chat");
    const clickedChatHistoryID = +chatHistoryItem.dataset.id;
    hideEmptyChatContent();
    const tx = await createTransaction("chats", "readonly");
    const store = tx.objectStore("chats");
    const data = await takeCurrentChatFromIndexDB(store, clickedChatHistoryID);
    createSelectedChatHistoryMessages(data.messages);
  }
};
const createSelectedChatHistoryMessages = (data) => {
  messagesContainer.innerHTML = "";
  data.forEach((message) => {
    switch (message.role) {
      case "user":
        "user";
        createMessges(message, "user");
        break;
      case "ai":
        createMessges(message, "ai");
        break;
    }
  });
};

recentChatsContainer.forEach((container) => {
  container.addEventListener("click", changeChatsContent);
});

export default takeChatsHistoryFromIndexedDB;
