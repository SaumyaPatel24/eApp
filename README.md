# E-Commerce Project

A full-stack e-commerce application with separate customer and admin interfaces.
## Project Link

```
http://3.12.26.122:5173
http://3.12.26.122:5174
```
- **Admin-side initial credentials:**
- Super-admin:
username: super@example.com
password: superadmin123

- Admin:
username: admin@example.com
password: admin123

- Customer:
Just sign up and then sign in.


## Project Structure

```
project-app/
├── backend/          # Express.js API server
├── frontend/         # React customer-facing app
├── admin-frontend/   # React admin dashboard
└── docker-compose.yml
```

## Features

- **Customer Features:**
  - Product catalog with search and filters
  - Product details with reviews
  - Shopping cart
  - User authentication (sign up/sign in)
  - Checkout process
  - Chatbot

- **Admin Features:**
  - Product management
  - User management
  - Order management
  - Dashboard analytics

## Tech Stack

### Backend
- Node.js with Express.js
- Sequelize ORM
- MySQL database
- JWT authentication
- bcrypt for password hashing

### Frontend
- React 19
- React Router
- Tailwind CSS
- Vite

## Prerequisites

- Node.js (v18 or higher)
- MySQL 8.0
- Docker and Docker Compose (optional, for containerized setup)

## Setup Instructions

### Option 1: Docker Compose (Recommended)

1. Clone the repository and navigate to the project:
   ```bash
   cd project-app
   ```

2. Start all services:
   ```bash
   docker-compose up -d
   ```

3. Access the applications:
   - Frontend: http://localhost:5173
   - Admin Frontend: http://localhost:5174
   - Backend API: http://localhost:3000

4. Stop services:
   ```bash
   docker-compose down
   ```

### Option 2: Local Development

#### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:
   ```env
   DB_HOST=localhost
   DB_NAME=ecommerce_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   JWT_SECRET=your-secret-jwt-key
   OPENAI_API_KEY=your-openai-api-key
   PORT=3000
   ```

4. Set up MySQL database:
   - Create a MySQL database named `ecommerce_db`
   - Import the schema from `ecommerce_dump.sql` if available

5. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will run on http://localhost:3000

#### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file for custom API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:5173

#### Admin Frontend Setup

1. Navigate to admin-frontend directory:
   ```bash
   cd admin-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file for custom API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The admin frontend will run on http://localhost:5174

## Environment Variables

### Backend (.env)
- `DB_HOST` - MySQL host (default: localhost)
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 3001)

### Frontend (.env)
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3000)

### Admin Frontend (.env)
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3000)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Reviews
- `GET /api/reviews/:productId` - Get reviews for a product
- `POST /api/reviews` - Create review (authenticated)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order

### Admin
- `GET /api/admin/*` - Admin endpoints (require admin role)

### Chatbot
- `GET /api/chatbot/history` - Fetch conversation history for the currently logged-in user
- `POST /api/chatbot/message` - Send a message to the chatbot (user input)
- `GET /api/admin/chatbot/history?userId=<id>` - Fetch chatbot conversation history for a specific user (admin view)
- `POST /api/admin/chatbot/message` - Send a message on behalf of a user or admin to the chatbot (admin action)

## Database Schema

The application uses the following main models:
- **User** - Customer and admin users
- **Product** - Product catalog
- **Review** - Product reviews
- **Order** - Customer orders
- **OrderItem** - Order line items

## Development

### Running in Development Mode

Each service can be run independently:

- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`
- Admin: `cd admin-frontend && npm run dev`

### Building for Production

- Frontend: `cd frontend && npm run build`
- Admin Frontend: `cd admin-frontend && npm run build`
- Backend: `cd backend && npm start`

## Troubleshooting

1. **Database Connection Issues:**
   - Ensure MySQL is running
   - Verify database credentials in `.env`
   - Check that the database exists

2. **CORS Errors:**
   - Ensure backend CORS is configured correctly
   - Check that API URLs match in frontend configuration

3. **Port Already in Use:**
   - Change ports in `.env` files or `docker-compose.yml`
   - Kill processes using the ports

## License

This project is for educational purposes.
