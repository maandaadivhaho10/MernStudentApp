import axios from "axios";

const api = axios.create({
  baseURL: "https://mernstudentapp-1.onrender.com/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
