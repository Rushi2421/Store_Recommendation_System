import axios from "axios";

// Create a pre-configured axios instance
const API = axios.create({
  baseURL: "https://store-recommendation-system-backend.onrender.com",  // 🔁 Change this to your production URL later
  withCredentials: true,                 // if you're using cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
