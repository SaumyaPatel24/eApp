#!/bin/bash

echo "🛑 Stopping all services and killing processes..."

# Kill processes on ports
echo "Killing processes on ports 3306, 5000, 5173, 5174..."
lsof -ti:3306,5000,5173,5174 | xargs kill -9 2>/dev/null || true

# Kill Node processes
pkill -f "node.*5173" 2>/dev/null || true
pkill -f "node.*5174" 2>/dev/null || true
pkill -f "node.*5000" 2>/dev/null || true
pkill -f "nodemon" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# Stop Docker containers if Docker is running
if docker info > /dev/null 2>&1; then
    echo "Stopping Docker containers..."
    docker-compose down -v 2>/dev/null || true
    docker ps -a | grep ecommerce | awk '{print $1}' | xargs docker rm -f 2>/dev/null || true
    echo "✅ Docker containers stopped"
else
    echo "⚠️  Docker is not running - skipping Docker cleanup"
fi

sleep 2

echo ""
echo "🚀 Starting all services..."
echo ""

# Check if Docker is available
if docker info > /dev/null 2>&1; then
    echo "Using Docker Compose..."
    docker-compose up -d --build
    
    echo ""
    echo "⏳ Waiting for services to start (15 seconds)..."
    sleep 15
    
    echo ""
    echo "✅ All services started with Docker!"
    echo ""
    echo "📊 Service URLs:"
    echo "   - Frontend:        http://localhost:5173"
    echo "   - Admin Frontend:  http://localhost:5174"
    echo "   - Backend API:     http://localhost:5000"
    echo "   - Database:        localhost:3306"
    echo ""
    echo "📝 View logs: docker-compose logs -f"
else
    echo "⚠️  Docker is not running. Starting services locally..."
    echo ""
    echo "Please ensure:"
    echo "  1. MySQL is running on localhost:3306"
    echo "  2. Backend .env file is configured"
    echo ""
    
    # Start backend
    echo "Starting Backend (port 5000)..."
    cd backend
    if [ ! -f .env ]; then
        echo "⚠️  Backend .env file not found. Creating from example..."
        cp .env.example .env 2>/dev/null || echo "Please create backend/.env file"
    fi
    npm run dev > ../backend.log 2>&1 &
    BACKEND_PID=$!
    echo "Backend started (PID: $BACKEND_PID)"
    cd ..
    
    sleep 3
    
    # Start frontend
    echo "Starting Frontend (port 5173)..."
    cd frontend
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "Frontend started (PID: $FRONTEND_PID)"
    cd ..
    
    sleep 2
    
    # Start admin frontend
    echo "Starting Admin Frontend (port 5174)..."
    cd admin-frontend
    npm run dev > ../admin-frontend.log 2>&1 &
    ADMIN_PID=$!
    echo "Admin Frontend started (PID: $ADMIN_PID)"
    cd ..
    
    echo ""
    echo "✅ All services started locally!"
    echo ""
    echo "📊 Service URLs:"
    echo "   - Frontend:        http://localhost:5173"
    echo "   - Admin Frontend:  http://localhost:5174"
    echo "   - Backend API:     http://localhost:5000"
    echo ""
    echo "📝 View logs:"
    echo "   tail -f backend.log"
    echo "   tail -f frontend.log"
    echo "   tail -f admin-frontend.log"
    echo ""
    echo "🛑 To stop: pkill -f 'node.*dev'"
fi
