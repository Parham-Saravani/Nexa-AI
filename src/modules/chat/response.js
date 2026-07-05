import Message from "../class/message.js";
const baseUrl = "https://nexa-ai-3-fpa0.onrender.com";

const sendMessage = async (obj) => {
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      throw new Error("Server-Error");
    }
    const data = await response.json();
    return new Message(data.choices[0].message.content, "ai");
  } catch (error) {
    return 'Server-Error'
  }
};
export default sendMessage;
