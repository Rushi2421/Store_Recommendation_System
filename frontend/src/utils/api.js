import axios from "axios";

// Create a pre-configured axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",  // 🔁 Change this to your production URL later
  withCredentials: true,                 // if you're using cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
