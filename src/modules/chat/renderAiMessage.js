import { marked } from "marked";
const renderAiMessage = (content) => {
  let currentText = "";
  const aiMessageContainer = document.querySelectorAll(".ai-message-text");
  console.log(aiMessageContainer.length);

  const currentMessage =
    aiMessageContainer.length === 1
      ? aiMessageContainer[0]
      : aiMessageContainer[aiMessageContainer.length - 1];
  let index = 0;
  const timer = setInterval(() => {
    currentText += content[index];
    index++;
    if (index === content.length) {
      clearInterval(timer);
    }
    currentMessage.innerHTML = marked.parse(currentText);
  }, 30);
};

export default renderAiMessage;
