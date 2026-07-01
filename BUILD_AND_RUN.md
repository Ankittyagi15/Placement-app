# Placement Prep Portal - Build & Run Guide

## Quick Start

### Step 1: Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

**Backend runs on:** `http://localhost:8080`

**H2 Console Access:** `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:placementdb`
- Username: `sa`
- Password: (empty)

### Step 2: Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

### Step 3: Access the Application

Open your browser and visit: `http://localhost:3000`

## Build for Production

### Backend

```bash
cd backend
mvn clean package
# JAR file will be in target/ directory
java -jar target/placement-prep-portal-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm run build
# Build files will be in dist/ directory
# Serve using: npx serve dist
```

## API Endpoints Reference

### MCQs

- `GET /api/mcqs` - Get all MCQs
- `POST /api/mcqs` - Create MCQ
- `PUT /api/mcqs/{id}` - Update MCQ
- `DELETE /api/mcqs/{id}` - Delete MCQ

### Coding Questions

- `GET /api/coding` - Get all coding questions
- `POST /api/coding` - Create coding question
- `PUT /api/coding/{id}` - Update coding question
- `DELETE /api/coding/{id}` - Delete coding question

### Quiz

- `POST /api/quiz/submit` - Submit quiz
- `GET /api/quiz/results` - Get all results
- `GET /api/quiz/stats` - Get statistics

## Sample Data

The application loads with:

- **30 MCQ Questions** across 6 categories
- **30 Coding Problems** across 16 topics
- Sample quiz results for demonstration

## System Requirements

- **Java**: 21 or higher
- **Node.js**: 18 or higher
- **npm**: 9 or higher
- **Maven**: 3.8 or higher
- **RAM**: 2GB minimum
- **Disk Space**: 500MB

## Troubleshooting

### Backend Issues

**Port 8080 Already in Use**

```bash
# Change port in application.properties
server.port=8081
```

**Maven Build Fails**

```bash
# Clear local cache
mvn clean
# Update dependencies
mvn install -U
```

### Frontend Issues

**Port 3000 Already in Use**

```bash
# Update vite.config.js
server: {
  port: 3001
}
```

**Module Not Found**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure Quick Reference

```
backend/
├── pom.xml
└── src/main/java/com/placementprep/portal/
    ├── entity/           # JPA Entities (MCQ, CodingQuestion, QuizResult)
    ├── repository/       # Spring Data Repositories
    ├── service/          # Business Logic
    ├── controller/       # REST Controllers
    ├── dto/              # Data Transfer Objects
    ├── exception/        # Exception Handling
    ├── config/           # Configuration Classes
    └── PlacementPrepPortalApplication.java

frontend/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── components/       # Reusable Components
    ├── pages/            # Page Components
    ├── services/         # API Integration
    ├── hooks/            # Custom Hooks
    ├── utils/            # Utilities
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

## Default Admin Panel Credentials

**No authentication required** - Access admin panel directly at `/admin`

## Technology Verification

Verify installations:

```bash
java -version
node --version
npm --version
mvn --version
```

## Performance Tips

1. **Backend**: First request may be slower due to JPA initialization
2. **Frontend**: Use Chrome DevTools for performance analysis
3. **Database**: H2 is in-memory, data resets on restart

## Next Steps After Setup

1. ✅ Verify backend is running (check `/api/mcqs`)
2. ✅ Verify frontend loads properly
3. ✅ Test MCQ functionality
4. ✅ Test coding challenges
5. ✅ Try admin panel
6. ✅ Submit a quiz and check results

## Support

For issues or questions:

1. Check the main README.md
2. Review error messages in console
3. Verify all dependencies are installed
4. Ensure Java 21 and Node 18+ are installed

---

**Happy Placement Preparation! 🎓**
