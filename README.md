# 🛍️ Store Recommendation System for Raigad District

A full-stack web application that recommends nearby stores in **Raigad District** based on location, store type, and user preferences.  
Includes both a **user interface** and an **admin panel** for managing stores within the district.

---

## 🚀 Live URLs

- **Frontend (User):** [https://store-recommendation-system-xlfl.vercel.app](https://store-recommendation-system-xlfl.vercel.app)
- **Admin Panel:** [https://store-recommendation-system.vercel.app](https://store-recommendation-system.vercel.app)
- **Backend API:** [https://store-recommendation-system-backend.onrender.com](https://store-recommendation-system-backend.onrender.com)

---

## 🧑‍💻 Tech Stack

- **Frontend:** React + Vite + Axios + MapLibre + React Router
- **Admin:** React + Vite + Axios + Protected Routes
- **Backend:** Node.js + Express + MongoDB + JWT + Python (ML integration)
- **ML:** Python, Pandas, Scikit-learn, Geopy, Pymongo
- **Hosting:** Vercel (frontend/admin), Render (backend)

---

## ⚙️ Key Features

✅ Store recommendations using KNN + cosine similarity  
✅ Geolocation + Map view with routes  
✅ User login / register + preferences tracking  
✅ Admin login / register + store CRUD  
✅ Real-time MongoDB updates  
✅ Python ML integration (recommend_stores.py)  
✅ Designed specifically for **Raigad District** store locations

---

# Clone the repo
git clone https://github.com/your-username/Store_Recommendation_System.git
cd Store_Recommendation_System

# Start backend
cd backend
npm install
node server.js

# Start frontend
cd ../frontend
npm install
npm run dev

# Start admin
cd ../admin
npm install
npm run dev

# Change .env File

