# 👥 User Accounts & Credentials

## 🔐 Login Credentials

All users have the password: **Admin@123**

---

### 1. Super Admin
- **Email:** `superadmin@example.com`
- **Name:** SDawit Mersha
- **Role:** `superadmin`
- **Password:** `Admin@123`
- **Access:** Full admin dashboard access, can manage all users and products

---

### 2. Admin
- **Email:** `admin@example.com`
- **Name:** ADawit Mersha
- **Role:** `admin`
- **Password:** `Admin@123`
- **Access:** Admin dashboard access, can manage products

---

### 3. Customer
- **Email:** `customer@example.com`
- **Name:** CDawit Mersha
- **Role:** `customer`
- **Password:** `Admin@123`
- **Access:** Customer frontend, can browse and purchase products

---

## 🌐 Login URLs

### Customer Frontend
- **URL:** http://localhost:5173/signin
- **Use:** `customer@example.com` / `Admin@123`

### Admin Frontend
- **URL:** http://localhost:5174
- **Use:** `admin@example.com` or `superadmin@example.com` / `Admin@123`

---

## 📝 Quick Login Reference

| Role | Email | Password | Frontend |
|------|-------|----------|----------|
| Customer | customer@example.com | Admin@123 | http://localhost:5173 |
| Admin | admin@example.com | Admin@123 | http://localhost:5174 |
| Super Admin | superadmin@example.com | Admin@123 | http://localhost:5174 |

---

## ✅ Test Login

You can test login via API:

```bash
# Test Admin Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin@123"
  }'

# Test Customer Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "Admin@123"
  }'
```

---

## 🔄 Creating New Users

### Create Customer User
Use the sign-up page: http://localhost:5173/signup

Or via API:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "yourpassword",
    "phone": "1234567890"
  }'
```

### Create Admin User (requires superadmin)
1. Login to admin dashboard as superadmin
2. Navigate to Users page
3. Create new admin user

---

## 📊 Database Query

To view all users:
```sql
SELECT id, firstName, lastName, email, role FROM user;
```
