let db = null;

const createDataBaseInIndexedDB = () => {
  const response = indexedDB.open("NexaAi", 1);
  response.addEventListener("error", (event) => {
    console.log(event);
    
  });
  response.addEventListener("success", (event) => {
    db = event.target.result;
    console.log("this is db open success");
    console.log(db);
    
  });
  response.addEventListener("upgradeneeded", (event) => {
    db = event.target.result;
    createChatsObjectStore();
  });
  console.log(db);
  
};

const createChatsObjectStore = () => {
  const condition = db.objectStoreNames.contains("chats");
  if (condition) return;
  const chatsStore = db.createObjectStore("chats", { keyPath: "id" });
};

const createTransaction = (storeName, mode) => {
//   console.log(db);

//   const transaction = db.transaction(storeName, mode);
//   transaction.addEventListener("error", () => {
//     console.log("transaction is not done");
//   });
//   transaction.addEventListener("complete", () => {
//     console.log("tranactoin is done");
//   });
};
window.addEventListener("DOMContentLoaded", createDataBaseInIndexedDB);

export { createDataBaseInIndexedDB, createTransaction };
