#!/bin/bash
set -e

echo "🔧 Placement Prep Portal - Render Build Script"
echo "================================================"

# Check Java
echo "📦 Checking Java..."
java -version

# Build Backend
echo ""
echo "🔨 Building Backend..."
cd backend
./mvnw clean package -DskipTests -B
echo "✅ Backend build complete!"

# Check JAR
echo ""
echo "📋 Verifying JAR file..."
if [ -f "target/placement-prep-portal-1.0.0.jar" ]; then
    echo "✅ JAR file created successfully"
    ls -lh target/placement-prep-portal-1.0.0.jar
else
    echo "❌ JAR file not found!"
    exit 1
fi

echo ""
echo "================================================"
echo "✅ Build completed successfully!"
