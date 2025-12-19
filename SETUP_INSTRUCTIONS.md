# 🚀 E-Commerce Project - Setup Instructions

## Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- MySQL 8.0
- npm or yarn

### Installation Steps

1. **Extract the project**
   ```bash
   unzip project-app-share.zip
   cd project-app
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install Admin Frontend Dependencies**
   ```bash
   cd ../admin-frontend
   npm install
   ```

5. **Set Up Database**
   - Make sure MySQL is running
   - Create a database:
     ```sql
     CREATE DATABASE ecommerce;
     ```
   - Import the database schema (if ecommerce_dump.sql exists):
     ```bash
     mysql -u root ecommerce < ecommerce_dump.sql
     ```

6. **Configure Backend Environment**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `.env` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce
   JWT_SECRET=your-secret-key
   PORT=3001
   ```

7. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on http://localhost:3001

8. **Start Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

9. **Start Admin Frontend** (in a new terminal)
   ```bash
   cd admin-frontend
   npm run dev
   ```
   Admin will run on http://localhost:5174

## Service URLs

- **Customer Frontend:** http://localhost:5173
- **Admin Frontend:** http://localhost:5174
- **Backend API:** http://localhost:3001

## Troubleshooting

### Port 5000 Issues
If you encounter issues with port 5000, it's likely blocked by macOS AirPlay. The project is configured to use port 3001 instead.

### Database Connection Issues
- Ensure MySQL is running
- Check your `.env` file credentials
- Verify the database exists: `mysql -u root -e "SHOW DATABASES;"`

### Missing Dependencies
Run `npm install` in each directory (backend, frontend, admin-frontend)

## Need Help?

Check the main README.md file for more detailed information.
