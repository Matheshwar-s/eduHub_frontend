import axios from "axios";

const api = axios.create({
  baseURL: "https://eduhub-backend-kcnj.onrender.com",
});

export default api;
