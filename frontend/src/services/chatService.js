import api from "./api";

export async function askQuestion(question) {
  const response = await api.post("/chat", {
    question,
  });

  return response.data;
}