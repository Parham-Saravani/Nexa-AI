import Message from "../class/message.js";
const baseUrl = "http://localhost:1060";

const sendMessage = async (obj) => {
  console.log(obj);

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await response.json();
  return new Message(data.choices[0].message.content, "ai");
};
export default sendMessage;
