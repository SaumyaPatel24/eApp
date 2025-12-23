# ⚡ Quick Start Guide - VS Code

## 🚀 Fast Setup (5 Minutes)

### 1. Database Setup
```bash
# Start MySQL (if not running)
brew services start mysql  # macOS
# or check Services on Windows

# Create and import database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecommerce;"
mysql -u root ecommerce < ecommerce_dump.sql
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env file (see backend/.env.example)
npm run dev
```

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

### 4. Admin Setup (New Terminal)
```bash
cd admin-frontend
npm install
npm run dev
```

### 5. Access Applications
- Customer: http://localhost:5173
- Admin: http://localhost:5174
- API: http://localhost:3001

---

## 🎯 Using VS Code Tasks (Easiest Way)

1. **Open project in VS Code:**
   ```
   File > Open Folder > Select project-app folder
   ```

2. **Run all services at once:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type: "Tasks: Run Task"
   - Select: "Start All Services"

3. **That's it!** All 3 services will start automatically.

---

## 📋 Required .env File

**backend/.env:**
```env
PORT=3001
DB_HOST=localhost
DB_NAME=ecommerce
DB_USER=root
DB_PASSWORD=
JWT_SECRET=supersecretkey
```

---

## 🆘 Quick Fixes

**Port in use?**
```bash
lsof -ti:3001,5173,5174 | xargs kill -9
```

**Database error?**
```bash
mysql -u root -e "USE ecommerce; SHOW TABLES;"
```

**Module errors?**
```bash
rm -rf node_modules package-lock.json && npm install
```

---

For detailed instructions, see **VS_CODE_SETUP.md**
