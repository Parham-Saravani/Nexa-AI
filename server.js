import express, { json } from "express";
import cors from "cors";
const app = express();
const baseUrl = "https://api.llm7.io/v1/chat/completions";
const apiKey =
  "RA/x1GSJZsUwDVIRm7S6L+wNUkp0MNn7oqE/2Oh/BDGy1ruX3rSFUZo6aQnPPkEy5Vpfz0VSC9Q4/i5qN9nCCLsIilB2Oe8BHW47R9AO/s9OJf9uJNGSdHv8zC6A3dJHVGKzJDNe1mxcEvc4Ch1MERev0w==";

app.use(express.json());
app.use(cors());

app.post("/api/chat", async (req, res) => {
  const { content, model } = req.body;
  const response = await fetchData(content, model);
  return res.status(200).json(response);
});

const fetchData = async (content, model) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    }),
  });
  const data = await response.json();
  return data;
};

app.listen(1060, () => {
  console.log("Listening On Port 1060");
});
