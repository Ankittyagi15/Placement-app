#!/bin/sh
set -e

echo "🚀 Starting Placement Prep Portal..."

# Start backend in background
echo "📦 Starting backend on port 8080..."
java -jar /app/app.jar &
BACKEND_PID=$!

# Wait for backend to be ready
echo "⏳ Waiting for backend to start..."
sleep 10

# Start frontend
echo "🎨 Starting frontend on port 3000..."
serve -s /app/frontend-dist -l 3000

# Keep the container running
wait $BACKEND_PID
