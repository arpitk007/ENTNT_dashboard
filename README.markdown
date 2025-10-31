# ⚙️ Equipment Rental Management Dashboard  

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)](https://vitejs.dev/)
[![MUI](https://img.shields.io/badge/MUI-5.15-007FFF?logo=mui)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-181717?logo=github)](https://arpitk007.github.io/ENTNT_dashboard/)

---

### 🧩 Overview  

The **Equipment Rental Management Dashboard** is a frontend-only React application built for **ENTNT** as part of a **Frontend Developer (React)** assignment.  
It provides a responsive, interactive dashboard to manage **equipment inventory, rentals, maintenance, and role-based access**, with all data stored locally via `localStorage`.

The app is powered by **React + Vite**, styled with **Material UI**, and navigated through **React Router (HashRouter)** for full GitHub Pages compatibility.

---

## 🌐 Live Demo  

🎯 **View Live App:** [https://arpitk007.github.io/ENTNT_dashboard/](https://arpitk007.github.io/ENTNT_dashboard/)  
💾 **GitHub Repo:** [https://github.com/arpitk007/ENTNT_dashboard](https://github.com/arpitk007/ENTNT_dashboard)

---

## ⚙️ Tech Stack  

| Category | Tools & Libraries |
|-----------|------------------|
| **Frontend Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **UI Framework** | [Material UI (MUI)](https://mui.com/) |
| **Routing** | [React Router DOM (HashRouter)](https://reactrouter.com/) |
| **State Management** | Context API |
| **Data Persistence** | LocalStorage |
| **Deployment** | GitHub Pages (gh-pages branch) |

---

## ✨ Core Features  

- 🔐 **Role-based Authentication** (Admin / Staff / Customer)
- 🧰 **Equipment Management** (Add, Edit, Delete, View Details)
- 📦 **Rental Management** (Create, Filter, Status Tracking)
- 🧾 **Maintenance Management** (Add, Edit Maintenance Tasks)
- 🗓️ **Rental Calendar View**
- 🔔 **Notification Center** with dismissible alerts
- 📊 **KPIs Dashboard** with key performance metrics
- 🌙 **Dark/Light Mode**
- 📱 **Fully Responsive Design**

---

## ⚙️ Setup Instructions  

### Prerequisites  
- Node.js ≥ 18  
- npm ≥ 9  
- Git installed  

### Installation  

```bash
# Clone the repository
git clone https://github.com/arpitk007/ENTNT_dashboard.git
cd ENTNT_dashboard

# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build
npm run preview

# Deploy to GitHub Pages
npm run deploy
