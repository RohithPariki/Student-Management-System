# 🎓 Student Management System

A full-stack web application to manage student records — including adding, editing, deleting, and searching students by name or roll number. Built using **MERN Stack** (MongoDB Atlas, Express, React, Node.js).

---

## 🔧 Features

- ✅ Add / Edit / Delete Students
- ✅ Search by Name or Roll Number
- ✅ Roll No format validation: `20XXCSE-0YY`
- ✅ Form validation with Formik & Yup
- ✅ Responsive UI with Dark Mode
- ✅ Tooltips & animations using Framer Motion
- ✅ Toast notifications for feedback
- ✅ MongoDB Atlas integration
- ✅ REST API with Express.js

---



## 📁 Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | React + Vite + Tailwind CSS |
| Backend     | Node.js + Express.js        |
| Database    | MongoDB Atlas (Mongoose)    |
| Extra Tools | Formik, Yup, Toastify, Framer Motion |

---

## 🚀 Getting Started

### 🔌 Backend Setup

```bash
cd server
npm install
# Add your MongoDB URI in .env:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/studentDB
npm run dev

💻 Frontend Setup
Edit
cd client
npm install
npm run dev
