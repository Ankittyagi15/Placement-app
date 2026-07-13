#!/bin/sh
set -e

echo "🚀 Starting Placement Prep Portal..."

# Start backend in background
echo "📦 Starting backend on port 8080..."
java -jar /app/app.jar &
BACKEND_PID=$!

# Wait for backend to be ready (poll /health)
echo "⏳ Waiting for backend to start (health check)..."
MAX_RETRIES=30
RETRY=0
until curl -sSf http://localhost:8080/health >/dev/null 2>&1; do
	RETRY=$((RETRY+1))
	if [ "$RETRY" -ge "$MAX_RETRIES" ]; then
		echo "⚠️  Backend did not become healthy after $((MAX_RETRIES*2))s. Continuing to start frontend."
		break
	fi
	echo "Waiting for backend... ($RETRY/$MAX_RETRIES)"
	sleep 2
done

# Start frontend
echo "🎨 Starting frontend on port 3000..."
serve -s /app/frontend-dist -l 3000

# Keep the container running
wait $BACKEND_PID
