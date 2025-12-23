# 🚀 VS Code Setup Instructions

Complete step-by-step guide to run the E-Commerce project in VS Code.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Node.js (v18 or higher) installed
- ✅ MySQL 8.0 installed and running
- ✅ VS Code installed
- ✅ VS Code extensions (optional but recommended):
  - ESLint
  - Prettier
  - MySQL (for database management)

---

## 🗄️ Step 1: Database Setup

### 1.1 Start MySQL
Make sure MySQL is running on your system:

**macOS:**
```bash
# Check if MySQL is running
brew services list | grep mysql

# If not running, start it:
brew services start mysql
```

**Windows:**
- Open Services (Win + R, type `services.msc`)
- Find "MySQL80" and ensure it's running
- Or use MySQL Workbench to start the service

**Linux:**
```bash
sudo systemctl start mysql
# or
sudo service mysql start
```

### 1.2 Create Database
Open a terminal in VS Code (`` Ctrl+` `` or `View > Terminal`) and run:

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecommerce;"
```

### 1.3 Import Database Schema
```bash
# Navigate to project root
cd /Users/dave/Desktop/E-Commerce_Project/project-app

# Import the database schema
mysql -u root ecommerce < ecommerce_dump.sql
```

### 1.4 Verify Database
```bash
mysql -u root -e "USE ecommerce; SHOW TABLES;"
```

You should see tables like: `user`, `products`, `orders`, etc.

---

## 🔧 Step 2: Backend Setup

### 2.1 Open Backend Folder in VS Code
1. Open VS Code
2. File > Open Folder
3. Navigate to: `/Users/dave/Desktop/E-Commerce_Project/project-app/backend`
4. Click "Select Folder"

### 2.2 Install Dependencies
Open VS Code terminal (`` Ctrl+` ``) and run:

```bash
npm install
```

### 2.3 Configure Environment Variables
1. In VS Code, create/edit `.env` file in the `backend` folder
2. Copy from `.env.example` or create new:

```env
# Server
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_NAME=ecommerce
DB_USER=root
DB_PASSWORD=
# Leave DB_PASSWORD empty if MySQL root has no password
# Or set your MySQL root password

# JWT Secret Key
JWT_SECRET=supersecretkey
```

3. Save the file (Ctrl+S)

### 2.4 Start Backend Server
In the VS Code terminal:

```bash
npm run dev
```

**Expected output:**
```
Database synced
Server running on port 3001
```

✅ Backend is now running at: **http://localhost:3001**

---

## 🎨 Step 3: Frontend Setup (Customer Site)

### 3.1 Open New VS Code Window (Optional)
You can either:
- **Option A:** Open a new VS Code window for frontend
- **Option B:** Use the same VS Code window and switch folders

**To open new window:**
1. File > New Window
2. File > Open Folder
3. Navigate to: `/Users/dave/Desktop/E-Commerce_Project/project-app/frontend`

### 3.2 Install Dependencies
Open terminal in VS Code (`` Ctrl+` ``):

```bash
npm install
```

### 3.3 Configure Environment (Optional)
Create `.env` file in `frontend` folder (optional, has defaults):

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 3.4 Start Frontend
In VS Code terminal:

```bash
npm run dev
```

**Expected output:**
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

✅ Frontend is now running at: **http://localhost:5173**

---

## 👨‍💼 Step 4: Admin Frontend Setup

### 4.1 Open Admin Frontend Folder
1. File > New Window (or use existing)
2. File > Open Folder
3. Navigate to: `/Users/dave/Desktop/E-Commerce_Project/project-app/admin-frontend`

### 4.2 Install Dependencies
```bash
npm install
```

### 4.3 Configure Environment (Optional)
Create `.env` file in `admin-frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:3001
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

✅ Admin Frontend is now running at: **http://localhost:5174**

---

## 🎯 Step 5: Running All Services in VS Code

### Option A: Multiple Terminals in VS Code

VS Code allows multiple terminals. Here's how:

1. **Open Integrated Terminal:** `` Ctrl+` ``
2. **Split Terminal:** Click the `+` button or `` Ctrl+Shift+` ``
3. **Create 3 terminals:**
   - Terminal 1: Backend (`cd backend && npm run dev`)
   - Terminal 2: Frontend (`cd frontend && npm run dev`)
   - Terminal 3: Admin (`cd admin-frontend && npm run dev`)

### Option B: VS Code Tasks (Recommended)

Create a task configuration to run all services at once:

1. **Create `.vscode/tasks.json`** in project root:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "npm run dev",
      "options": {
        "cwd": "${workspaceFolder}/backend"
      },
      "problemMatcher": [],
      "isBackground": true,
      "presentation": {
        "reveal": "always",
        "panel": "new",
        "group": "services"
      }
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "npm run dev",
      "options": {
        "cwd": "${workspaceFolder}/frontend"
      },
      "problemMatcher": [],
      "isBackground": true,
      "presentation": {
        "reveal": "always",
        "panel": "new",
        "group": "services"
      }
    },
    {
      "label": "Start Admin Frontend",
      "type": "shell",
      "command": "npm run dev",
      "options": {
        "cwd": "${workspaceFolder}/admin-frontend"
      },
      "problemMatcher": [],
      "isBackground": true,
      "presentation": {
        "reveal": "always",
        "panel": "new",
        "group": "services"
      }
    },
    {
      "label": "Start All Services",
      "dependsOn": [
        "Start Backend",
        "Start Frontend",
        "Start Admin Frontend"
      ],
      "problemMatcher": []
    }
  ]
}
```

2. **Run the task:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type: "Tasks: Run Task"
   - Select: "Start All Services"

### Option C: Using npm Scripts (Simple)

Create a root `package.json` with scripts:

1. **In project root** (`/Users/dave/Desktop/E-Commerce_Project/project-app/`), create `package.json`:

```json
{
  "name": "ecommerce-project",
  "version": "1.0.0",
  "scripts": {
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:admin": "cd admin-frontend && npm run dev",
    "dev:all": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\" \"npm run dev:admin\""
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

2. **Install concurrently:**
```bash
npm install
```

3. **Run all services:**
```bash
npm run dev:all
```

---

## 📝 Quick Reference Commands

### Database Commands
```bash
# Start MySQL (macOS)
brew services start mysql

# Check MySQL status
mysql -u root -e "SELECT 1;"

# Access MySQL
mysql -u root

# Show databases
mysql -u root -e "SHOW DATABASES;"

# Use ecommerce database
mysql -u root -e "USE ecommerce; SHOW TABLES;"
```

### Backend Commands
```bash
cd backend
npm install          # First time only
npm run dev          # Start development server
npm start            # Start production server
```

### Frontend Commands
```bash
cd frontend
npm install          # First time only
npm run dev          # Start development server
npm run build        # Build for production
```

### Admin Frontend Commands
```bash
cd admin-frontend
npm install          # First time only
npm run dev          # Start development server
npm run build        # Build for production
```

---

## 🌐 Service URLs

Once all services are running:

- **Customer Frontend:** http://localhost:5173
- **Admin Frontend:** http://localhost:5174
- **Backend API:** http://localhost:3001
- **API Health Check:** http://localhost:3001/api/products

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port
lsof -ti:3001 | xargs kill -9
lsof -ti:5173 | xargs kill -9
lsof -ti:5174 | xargs kill -9
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

### VS Code Terminal Issues
- Use integrated terminal: `` Ctrl+` ``
- Split terminal: Click `+` or `` Ctrl+Shift+` ``
- Switch between terminals: `` Ctrl+PageUp/PageDown ``

---

## ✅ Verification Checklist

- [ ] MySQL is running
- [ ] Database `ecommerce` exists
- [ ] Database schema imported
- [ ] Backend `.env` file configured
- [ ] Backend dependencies installed
- [ ] Backend running on port 3001
- [ ] Frontend dependencies installed
- [ ] Frontend running on port 5173
- [ ] Admin frontend dependencies installed
- [ ] Admin frontend running on port 5174
- [ ] All services accessible in browser

---

## 🎉 You're All Set!

Once all services are running, you can:
- Browse products at: http://localhost:5173
- Manage products at: http://localhost:5174
- Test API at: http://localhost:3001/api/products

Happy coding! 🚀
