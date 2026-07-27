import api from "./api";

export async function askQuestion(question, activeDocument) {
  const response = await api.post("/chat", {
    question,
    document_name: activeDocument?.name || null,
  });

  return response.data;
}
export async function newChat() {
  const response = await api.post("/chat/new");
  return response.data;
}