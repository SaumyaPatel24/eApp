# 🌐 E-Commerce Project - Service URLs

## Main Applications

### 👤 Customer Frontend (Shopping Site)
**URL:** http://localhost:5173

**Features:**
- Browse products
- Search products
- View product details
- Add to cart
- User sign up / sign in
- Checkout
- Product reviews

---

### 👨‍💼 Admin Frontend (Admin Dashboard)
**URL:** http://localhost:5174

**Features:**
- Admin login
- Product management (CRUD)
- User management
- Order management
- Dashboard analytics

---

### 🔧 Backend API
**Base URL:** http://localhost:5000

**API Endpoints:**

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

#### Reviews
- `GET /api/reviews/:productId` - Get reviews for a product
- `POST /api/reviews` - Create review (authenticated users)

#### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order

#### Admin
- `GET /api/admin/*` - Admin endpoints (require admin role)

---

### 📊 Database
**Host:** localhost:3306
**Database:** ecommerce_db (or ecommerce)
**User:** ecommerce_user (or root)
**Password:** ecommerce_password (or your configured password)

---

## Quick Access

- **Customer Site:** http://localhost:5173
- **Admin Dashboard:** http://localhost:5174
- **API Health Check:** http://localhost:5000

---

## Status Check

To verify all services are running:
```bash
# Check ports
lsof -ti:5000,5173,5174

# View logs
tail -f backend.log
tail -f frontend.log
tail -f admin-frontend.log
```
