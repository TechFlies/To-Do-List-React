# 📝 To-Do List (React + Vite)

A modern, elegant, and theme-switchable **To-Do List App** built using **React**, **Vite**, and **Tailwind CSS**.  
Easily manage your daily tasks with features like search, filters, due dates, and local storage — all wrapped in a stunning Neon & Dark UI.

---
## ⚡ Tech Stack

<p align="center">
  <a href="https://vitejs.dev/" target="_blank">
    <img alt="Vite" src="https://img.shields.io/badge/Vite-4+-646CFF?logo=vite&logoColor=white" />
  </a>
  <a href="https://react.dev/" target="_blank">
    <img alt="React" src="https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white" />
  </a>
  <a href="https://tailwindcss.com/" target="_blank">
    <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" />
  </a>
</p>

---

## 🌟 Features

- 🧠 **Smart Context API** – Global state management  
- 📝 **Add, Edit, Delete, Complete** tasks  
- 📅 **Set Due Dates** with datetime picker  
- 🔍 **Search & Filter** (All / Active / Completed)  
- 💾 **Local Storage** – Auto-save tasks & theme  
- 🎨 **Theme Toggle:** Neon ✨ / Dark 🌙  
- ⚡ **Vite-powered** fast performance  
- 📱 **Responsive Design** for all screens  

---
## 📸 Preview

![Neon Todo App](https://github.com/TechFlies/To-Do-List-React/blob/4d89d54322bc2b20128ba24cfaac48ffab792b43/Screenshot%202025-10-27%20164401_edited.png)

---
## 🧰 Installation & Setup

```bash
# 1️⃣ Clone this repository
git clone https://github.com/your-username/todo-list-react.git

# 2️⃣ Move into the project folder
cd todo-list-react

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run the development server
npm run dev
```
Now open 👉 http://localhost:5173
 to view it in your browser.

---
## 🧩 Project Structure
```bash
src/
├── components/
│   ├── TodoForm.jsx       # Add/Search tasks + due date
│   └── TodoItem.jsx       # Task display, edit, delete
├── contexts/
│   └── TodoContext.jsx    # Context API for global todo state
├── App.jsx                # Main App logic + theme + filters
├── App.css                # Styles and theme handling
└── main.jsx               # Entry point
```
---
## 🌈 Theme Modes

- 🌟 Neon Mode — Vibrant gradients, glowing backgrounds, and glassmorphism effects

- 🌙 Dark Mode — Minimal, elegant, and distraction-free

Easily toggle between them using the “Neon / Dark” button.

---
## 💾 Local Storage Integration

Your:

- ✅ Todos

- 🧩 Theme preference

are automatically saved and reloaded on page refresh — no backend required!

---
## 🪶 License

This project is licensed under the MIT License — free to use and modify.
