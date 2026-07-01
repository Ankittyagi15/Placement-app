# Placement Prep Portal

A comprehensive Full Stack application for students to prepare for placements with MCQs, coding challenges, and progress tracking.

## 🎯 Features

### Core Features

- **MCQ Practice**: 100+ questions across 6 categories
- **Coding Challenges**: 30+ problems across various topics
- **Quiz Results Tracking**: Store and analyze all quiz attempts
- **Performance Analytics**: Category-wise performance insights
- **Admin Panel**: Manage MCQs and coding questions
- **Search & Filter**: Find questions by keyword, category, difficulty
- **No Authentication**: Free access without login

### MCQ Categories

- Operating System
- Computer Networks
- Java
- DBMS
- OOP
- SQL

### Coding Topics

Arrays, Strings, Linked List, Stack, Queue, Binary Tree, BST, Heap, Graph, Recursion, Backtracking, Sliding Window, Dynamic Programming, Searching, Sorting, Greedy

## 📋 Project Structure

```
placement-prep-portal/
├── backend/                          # Spring Boot Application
│   ├── src/main/java/com/placementprep/portal/
│   │   ├── controller/              # REST Controllers
│   │   ├── service/                 # Business Logic
│   │   ├── repository/              # Data Access Layer
│   │   ├── entity/                  # JPA Entities
│   │   ├── dto/                     # Data Transfer Objects
│   │   ├── exception/               # Exception Handling
│   │   ├── config/                  # Configuration Classes
│   │   └── PlacementPrepPortalApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties   # Configuration
│   │   └── data.sql                 # Sample Data
│   └── pom.xml                      # Maven Dependencies
│
└── frontend/                         # React + Vite Application
    ├── src/
    │   ├── components/              # Reusable Components
    │   ├── pages/                   # Page Components
    │   ├── services/                # API Services
    │   ├── hooks/                   # Custom Hooks
    │   ├── utils/                   # Utility Functions
    │   ├── assets/                  # Static Assets
    │   ├── App.jsx                  # Main App Component
    │   ├── main.jsx                 # Entry Point
    │   └── index.css                # Global Styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── .gitignore
```

## 🛠 Technology Stack

### Backend

- **Java 21** - Programming Language
- **Spring Boot 3** - Framework
- **Spring Data JPA** - ORM
- **H2 Database** - In-memory Database
- **Maven** - Build Tool
- **Lombok** - Code Generation

### Frontend

- **React 19** - UI Library
- **Vite** - Build Tool
- **React Router** - Routing
- **Axios** - HTTP Client
- **CSS3** - Styling

## 🚀 Getting Started

### Prerequisites

- Java 21 (JDK 21)
- Node.js 18+ and npm
- Maven 3.8+
- Git

### Backend Setup

1. **Navigate to backend directory**

```bash
cd backend
```

2. **Build the project**

```bash
mvn clean build
```

3. **Run the application**

```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

#### H2 Console

Access H2 Console at: `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:placementdb`
- Username: `sa`
- Password: (leave blank)

### Frontend Setup

1. **Navigate to frontend directory**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

4. **Build for production**

```bash
npm run build
```

## 📡 API Endpoints

### MCQ APIs

```
GET    /api/mcqs                              # Get all MCQs
GET    /api/mcqs/{id}                         # Get MCQ by ID
GET    /api/mcqs/category/{category}          # Get MCQs by category
GET    /api/mcqs/difficulty/{difficulty}      # Get MCQs by difficulty
GET    /api/mcqs/search?keyword=...           # Search MCQs
GET    /api/mcqs/filter?category=...&difficulty=... # Filter MCQs
POST   /api/mcqs                              # Create MCQ
PUT    /api/mcqs/{id}                         # Update MCQ
DELETE /api/mcqs/{id}                         # Delete MCQ
```

### Coding Question APIs

```
GET    /api/coding                            # Get all coding questions
GET    /api/coding/{id}                       # Get coding question by ID
GET    /api/coding/topic/{topic}              # Get by topic
GET    /api/coding/difficulty/{difficulty}    # Get by difficulty
GET    /api/coding/search?keyword=...         # Search coding questions
GET    /api/coding/filter?topic=...&difficulty=... # Filter
POST   /api/coding                            # Create coding question
PUT    /api/coding/{id}                       # Update coding question
DELETE /api/coding/{id}                       # Delete coding question
```

### Quiz APIs

```
POST   /api/quiz/submit                       # Submit quiz
GET    /api/quiz/results                      # Get all results
GET    /api/quiz/results/{id}                 # Get result by ID
GET    /api/quiz/results/category/{category}  # Get results by category
GET    /api/quiz/stats                        # Get overall statistics
```

## 💾 Database Schema

### MCQ Table

```sql
CREATE TABLE mcqs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer VARCHAR(1) NOT NULL,
  category VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  explanation TEXT
);
```

### CodingQuestion Table

```sql
CREATE TABLE coding_questions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  topic VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  platform VARCHAR(50) NOT NULL,
  platform_url VARCHAR(500),
  problem_number VARCHAR(50)
);
```

### QuizResult Table

```sql
CREATE TABLE quiz_results (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50),
  total_questions INT,
  correct_answers INT,
  wrong_answers INT,
  score DOUBLE,
  percentage DOUBLE,
  attempted_at TIMESTAMP
);
```

## 📊 Sample Data

The application includes 30 MCQs and 30 coding questions pre-loaded via `data.sql`:

- 5 questions per MCQ category
- 2 questions per coding topic
- Mix of Easy, Medium, and Hard difficulties
- Platform links for coding questions

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Dashboard**: Clean and professional interface
- **Color Coding**: Visual indicators for difficulty and categories
- **Progress Tracking**: Detailed analytics and performance charts
- **Real-time Feedback**: Instant results after quiz submission
- **Interactive Components**: Smooth transitions and animations

## 🔐 Security Features

- Input validation using Hibernate Validation
- Global exception handling
- CORS configuration for cross-origin requests
- Constructor injection (no field injection)

## 📝 Usage Guide

### For Students

1. **Home Page**: Explore features and statistics
2. **MCQ Section**: Select category → Answer questions → Submit → View results
3. **Coding Section**: Browse problems → Click solve → External platform opens
4. **Results**: Track all attempts and performance metrics
5. **About**: Learn more about the platform

### For Admins

1. Navigate to Admin Panel
2. **Manage MCQs**: Add, edit, delete questions
3. **Manage Coding Questions**: Add, edit, delete problems
4. Fill form with all required details
5. Changes reflect immediately in the application

## 🐛 Error Handling

- **Validation Errors**: 400 Bad Request with field error messages
- **Not Found**: 404 with descriptive message
- **Server Errors**: 500 with error details
- **Global Exception Handler**: Centralized error processing

## 📈 Performance Optimization

- **Frontend**: Code splitting, lazy loading
- **Backend**: Connection pooling, query optimization
- **Database**: H2 in-memory for fast access
- **API**: RESTful design for efficient communication

## 🚀 Future Enhancements

- User authentication and profiles
- Leaderboards and rankings
- Timed quizzes
- Video tutorials for topics
- Discussion forums
- Certificate generation
- Mock interviews
- AI-powered question recommendations

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

For questions or support, please reach out through:

- GitHub Issues
- Email: support@placementprepportal.com

## 🎓 Learning Outcomes

By using this platform, students will:

- Strengthen conceptual knowledge of CS fundamentals
- Practice coding problems on various topics
- Improve interview preparation
- Track and analyze their performance
- Gain confidence for placements

---

**Built with ❤️ for placement preparation**

Last Updated: January 2025
