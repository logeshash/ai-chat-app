import axios from "axios";
import { DEEPSEEK_API_KEY } from "@env";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1";

export const generateText = async (prompt) => {
  try {
    const response = await axios.post(
      `${DEEPSEEK_API_URL}/chat/completions`,
      {
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("DeepSeek Error:", error.response?.data || error.message);
    return "Error generating response";
  }
};
