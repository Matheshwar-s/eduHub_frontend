import axios from "axios";

const api = axios.create({
  baseURL: "https://eduhub-backend-kcnj.onrender.com",
  withCredentials: false,
  //baseURL: "http://localhost:8080",
});

export default api;
