# 🐾 Espaw Finder – Animal Rescue Web Platform

**Espaw Finder** is a web platform that allows users to register and view posts of lost animals, pets up for adoption, or those seeking a mate. The application includes JWT authentication, image uploads, filters by post type, and role-based dashboards.
💻 This is a local development project – both backend and frontend must be installed and run locally for the platform to function properly.
---

👥 Team Members
-Raúl Arturo León Morán

-Juan Carlos Gallo Muñoz

-Giancarlo Ayrton Ortiz Abarca

-José Andrés Vivanco Mora

---

## 📁 Project Structure

This repository consists of **two separate branches** that must be cloned individually:

- 🔄 `master-backend` → RESTful API (Node.js + Express + MySQL)
- 🎨 `master-frontend` → Web Interface (React.js)

⚠️ **Both projects must be running simultaneously** for the platform to work correctly.

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [XAMPP](https://www.apachefriends.org/) – to run Apache and MySQL locally
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) – to manage the database

---

## 🚀 Installation Guide

### 1. Clone the project branches

#### 🔧 Backend

```bash
git clone -b master-backend https://github.com/GiancarloAyrton/espawfinder.git espawfinder-backend
cd espawfinder-backend

git clone -b master-frontend https://github.com/GiancarloAyrton/espawfinder.git espawfinder-frontend
cd espawfinder-frontend


