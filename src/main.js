import "./style.css";
import "./modules/loader/loader.js";
import applyTheme from "./modules/theme/theme.js";
import "./modules/indexedDB/db.js";
import "./modules/menu/menu.js";
import "./modules/models/model.js";
import "./modules/tips/tips.js";
import "./modules/chat/emptyState.js";
import "./modules/chat/createMessages.js";
import "./modules/chat/createNewChat.js";
import takeChatsHistoryFromIndexedDB from "./modules/chat/chatHistory.js";

takeChatsHistoryFromIndexedDB();
applyTheme();
