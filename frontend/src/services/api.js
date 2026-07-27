import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const deletePdf = async (filename) => {
  const response = await api.delete(
    `/delete/${encodeURIComponent(filename)}`
  );

  return response.data;
};

export default api;