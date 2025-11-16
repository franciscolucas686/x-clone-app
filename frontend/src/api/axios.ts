import axios from "axios";

const api = axios.create({
  baseURL: "https://x-clone-app-ywgb.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
