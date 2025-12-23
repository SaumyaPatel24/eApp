# 🚀 Team Setup Guide - E-Commerce Project

Welcome! This guide will help you set up and run the E-Commerce project on your machine.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- ✅ **MySQL 8.0** - [Download](https://dev.mysql.com/downloads/mysql/)
- ✅ **Git** (optional, for version control)

---

## 🗄️ Step 1: Database Setup

### 1.1 Start MySQL Service

**macOS:**
```bash
brew services start mysql
# or
mysql.server start
```

**Windows:**
- Open Services (Win + R, type `services.msc`)
- Find "MySQL80" and start it
- Or use MySQL Workbench

**Linux:**
```bash
sudo systemctl start mysql
```

### 1.2 Create Database
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecommerce;"
```

### 1.3 Import Database Schema
```bash
# Navigate to project root
cd project-app

# Import the database
mysql -u root ecommerce < ecommerce_dump.sql
```

### 1.4 Verify Database
```bash
mysql -u root -e "USE ecommerce; SHOW TABLES;"
```

You should see 8 tables including: `user`, `products`, `orders`, etc.

---

## 🔧 Step 2: Backend Setup

### 2.1 Navigate to Backend
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Configure Environment
Create a `.env` file in the `backend` folder:

```env
# Server
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_NAME=ecommerce
DB_USER=root
DB_PASSWORD=
# Leave empty if MySQL root has no password
# Or set your MySQL root password

# JWT Secret Key
JWT_SECRET=supersecretkey
```

**Note:** Copy from `backend/.env.example` if it exists.

### 2.4 Start Backend
```bash
npm run dev
```

**Expected output:**
```
Database synced
Server running on port 3001
```

✅ Backend is running at: **http://localhost:3001**

---

## 🎨 Step 3: Frontend Setup (Customer Site)

### 3.1 Open New Terminal
Keep backend running, open a new terminal window.

### 3.2 Navigate to Frontend
```bash
cd frontend
```

### 3.3 Install Dependencies
```bash
npm install
```

### 3.4 Start Frontend
```bash
npm run dev
```

**Expected output:**
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

✅ Frontend is running at: **http://localhost:5173**

---

## 👨‍💼 Step 4: Admin Frontend Setup

### 4.1 Open Another Terminal
Keep previous services running.

### 4.2 Navigate to Admin Frontend
```bash
cd admin-frontend
```

### 4.3 Install Dependencies
```bash
npm install
```

### 4.4 Start Admin Frontend
```bash
npm run dev
```

**Expected output:**
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5174/
```

✅ Admin Frontend is running at: **http://localhost:5174**

---

## 🎯 Quick Start (Using VS Code Tasks)

If you're using VS Code:

1. **Open project in VS Code:**
   ```
   File > Open Folder > Select project-app folder
   ```

2. **Run all services:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type: "Tasks: Run Task"
   - Select: "Start All Services"

All 3 services will start automatically!

---

## 🔐 Login Credentials

All accounts use password: **Admin@123**

### Admin Account
- **Email:** `admin@example.com`
- **Password:** `Admin@123`
- **URL:** http://localhost:5174

### Superadmin Account
- **Email:** `superadmin@example.com`
- **Password:** `Admin@123`
- **URL:** http://localhost:5174

### Customer Account
- **Email:** `customer@example.com`
- **Password:** `Admin@123`
- **URL:** http://localhost:5173/signin

---

## 🌐 Service URLs

Once all services are running:

- **Customer Frontend:** http://localhost:5173
- **Admin Frontend:** http://localhost:5174
- **Backend API:** http://localhost:3001
- **API Products:** http://localhost:3001/api/products

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill processes on ports
lsof -ti:3001,5173,5174 | xargs kill -9
```

### Database Connection Error
1. Check MySQL is running: `mysql -u root -e "SELECT 1;"`
2. Verify `.env` file has correct credentials
3. Check database exists: `mysql -u root -e "SHOW DATABASES;"`

### Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Products Not Showing
- Ensure backend is running on port 3001
- Check browser console for errors
- Verify API is accessible: http://localhost:3001/api/products

---

## 📝 Project Structure

```
project-app/
├── backend/          # Express.js API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── .env         # Create this file
├── frontend/         # React customer app
│   └── src/
├── admin-frontend/   # React admin dashboard
│   └── src/
└── ecommerce_dump.sql  # Database schema
```

---

## ✅ Verification Checklist

Before testing, ensure:

- [ ] MySQL is running
- [ ] Database `ecommerce` exists
- [ ] Database schema imported (8 tables)
- [ ] Backend dependencies installed
- [ ] Backend `.env` file created
- [ ] Backend running on port 3001
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 5173
- [ ] Admin frontend dependencies installed
- [ ] Admin frontend running on port 5174

---

## 🎉 You're Ready!

Once all services are running:
- Browse products at: http://localhost:5173
- Manage products at: http://localhost:5174
- Test API at: http://localhost:3001/api/products

Happy testing! 🚀

---

## 📚 Additional Documentation

- **VS_CODE_SETUP.md** - Detailed VS Code setup
- **QUICK_START.md** - 5-minute quick start
- **USER_CREDENTIALS.md** - User account details
- **URLS.md** - All service URLs
- **README.md** - Project overview

---

## 💡 Tips

- Use VS Code tasks to run all services at once
- Keep 3 terminal windows open (one for each service)
- Check logs if something doesn't work
- Database changes persist between restarts
- Frontend hot-reloads on code changes

---

**Need Help?** Check the troubleshooting section or refer to the detailed documentation files.
