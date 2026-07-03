let db = null;

const openDataBasePromise = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("NexaAi", 1);

    request.addEventListener("error", (event) => {
      reject();
    });
    request.addEventListener("success", (event) => {
      db = event.target.result;
      resolve();
    });
    request.addEventListener("upgradeneeded", (event) => {
      db = event.target.result;
      createChatsObjectStore(db);
    });
  });
};

const createChatsObjectStore = () => {
  const condition = db.objectStoreNames.contains("chats");
  if (condition) return;
  const chatsStore = db.createObjectStore("chats", { keyPath: "id" });
};

const createTransaction = async (storeName, mode) => {
  await openDataBasePromise();
  const transaction = db.transaction(storeName, mode);
  transaction.addEventListener("error", () => {
  });
  transaction.addEventListener("complete", () => {
  });
  return transaction;
};

window.addEventListener("DOMContentLoaded", openDataBasePromise);

export { createTransaction };
