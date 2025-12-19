# ✅ Prerequisites Check - Before Running Tasks

## ⚠️ Important: Tasks.json Alone Won't Work!

The `tasks.json` will **start the services**, but you need to complete these steps first:

---

## 📋 Required Setup (One-Time)

### 1. ✅ Database Setup
```bash
# Check if database exists
mysql -u root -e "USE ecommerce; SHOW TABLES;"

# If error, create database:
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecommerce;"
mysql -u root ecommerce < ecommerce_dump.sql
```

### 2. ✅ Install Dependencies (One-time per folder)
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin Frontend
cd ../admin-frontend
npm install
```

### 3. ✅ Configure Backend Environment
Create `backend/.env` file:
```env
PORT=3001
DB_HOST=localhost
DB_NAME=ecommerce
DB_USER=root
DB_PASSWORD=
JWT_SECRET=supersecretkey
```

---

## 🎯 What tasks.json WILL Do

✅ Start Backend server (npm run dev)  
✅ Start Frontend server (npm run dev)  
✅ Start Admin Frontend server (npm run dev)  
✅ Run all 3 services simultaneously  

---

## ❌ What tasks.json WON'T Do

❌ Install npm dependencies  
❌ Create database  
❌ Import database schema  
❌ Create .env files  
❌ Start MySQL service  

---

## 🚀 Complete Setup Checklist

Before running tasks.json, ensure:

- [ ] MySQL is running
- [ ] Database `ecommerce` exists
- [ ] Database schema imported (tables exist)
- [ ] Backend dependencies installed (`backend/node_modules` exists)
- [ ] Frontend dependencies installed (`frontend/node_modules` exists)
- [ ] Admin dependencies installed (`admin-frontend/node_modules` exists)
- [ ] Backend `.env` file created and configured

---

## 📝 Quick Setup Script

Run this once before using tasks.json:

```bash
# 1. Database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecommerce;"
mysql -u root ecommerce < ecommerce_dump.sql

# 2. Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd admin-frontend && npm install && cd ..

# 3. Create backend .env (if not exists)
cd backend
if [ ! -f .env ]; then
  cat > .env << EOF
PORT=3001
DB_HOST=localhost
DB_NAME=ecommerce
DB_USER=root
DB_PASSWORD=
JWT_SECRET=supersecretkey
EOF
fi
cd ..
```

---

## ✅ After Setup, Then Use tasks.json

Once all prerequisites are done:
1. Press `Ctrl+Shift+P`
2. Type: "Tasks: Run Task"
3. Select: "Start All Services"

Everything will work! 🎉
