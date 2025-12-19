#!/bin/bash

# Start Docker services for E-Commerce Project
echo "Starting E-Commerce Project with Docker Compose..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running!"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

# Start all services
echo "🚀 Starting all services (database, backend, frontend, admin-frontend)..."
docker-compose up -d --build

echo ""
echo "✅ Services are starting up!"
echo ""
echo "📊 Service URLs:"
echo "   - Frontend:        http://localhost:5173"
echo "   - Admin Frontend:  http://localhost:5174"
echo "   - Backend API:     http://localhost:5000"
echo "   - Database:        localhost:3306"
echo ""
echo "📝 To view logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 To stop services:"
echo "   docker-compose down"
echo ""
