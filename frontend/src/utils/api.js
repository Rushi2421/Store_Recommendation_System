import axios from "axios";

// point to deployed backend:
const API = axios.create({
  baseURL: "https://store-recommendation-system-backend.onrender.com/api",  
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
