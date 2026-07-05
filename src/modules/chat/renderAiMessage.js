import { marked } from "marked";
let currentText = "";
const renderAiMessage = (content) => {
  const aiMessageContainer = document.querySelector(".ai-message-text");
  let index = 0;
  const timer = setInterval(() => {
    currentText += content[index];
    index++;
    if (index === content.length) {
      clearInterval(timer);
    }
    aiMessageContainer.innerHTML = marked.parse(currentText);
  }, 30);
};

export default renderAiMessage;
