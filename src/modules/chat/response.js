import Message from "../class/message.js";
const baseUrl = "https://nexa-ai-3-fpa0.onrender.com";

const sendMessage = async (obj) => {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  console.log(response);
  
  const data = await response.json();
  return new Message(data.choices[0].message.content, "ai");
};
export default sendMessage;
