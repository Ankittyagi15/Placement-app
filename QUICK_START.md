# ⚡ QUICK START - 5 MINUTES

Get the Placement Prep Portal running in just 5 minutes!

## Prerequisites Check

```bash
# Check Java version (need 21+)
java -version

# Check Node version (need 18+)
node --version

# Check npm version (need 9+)
npm --version

# Check Maven (need 3.8+)
mvn --version
```

---

## 🚀 START HERE

### Terminal 1: Run Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

**Expected Output:**

```
Started PlacementPrepPortalApplication in X.XXX seconds
```

**Backend URL:** `http://localhost:8080`

### Terminal 2: Run Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

**Expected Output:**

```
➜ Local: http://localhost:3000/
```

**Frontend URL:** `http://localhost:3000`

---

## ✅ VERIFY IT WORKS

### Test Backend API

Open in browser:

```
http://localhost:8080/api/mcqs
```

Should see JSON with MCQ data ✓

### Test Frontend

Open in browser:

```
http://localhost:3000
```

Should see home page ✓

### Test H2 Console

```
http://localhost:8080/h2-console
```

- URL: `jdbc:h2:mem:placementdb`
- User: `sa`
- Password: (empty)

---

## 🎮 TRY THE FEATURES

1. **Home Page** - See welcome & features
2. **MCQs** - Practice questions
3. **Coding** - Coding challenges
4. **Results** - View statistics
5. **Admin** - Add/edit questions
6. **About** - Learn more

---

## 📱 DEFAULT ROUTES

| Page    | URL                           |
| ------- | ----------------------------- |
| Home    | http://localhost:3000         |
| MCQs    | http://localhost:3000/mcqs    |
| Coding  | http://localhost:3000/coding  |
| Results | http://localhost:3000/results |
| Admin   | http://localhost:3000/admin   |
| About   | http://localhost:3000/about   |

---

## 🛠 TROUBLESHOOTING

### Port 8080 in use?

```bash
# Change port in backend/src/main/resources/application.properties
# Change: server.port=8081
```

### Port 3000 in use?

```bash
# Kill process on port 3000
# Mac/Linux: lsof -i :3000 | kill -9 <PID>
# Windows: netstat -ano | findstr :3000
```

### Maven not found?

```bash
# Install Maven or add to PATH
# Verify: mvn --version
```

### Node modules error?

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📊 Sample Data Loaded

✓ 30 MCQ Questions (5 per category)
✓ 30 Coding Problems (2 per topic)
✓ Auto-loaded on backend start

---

## 🎯 WHAT'S INCLUDED

### MCQ Categories

- Operating System
- Computer Networks
- Java
- DBMS
- OOP
- SQL

### Coding Topics

Arrays, Strings, Linked List, Stack, Queue, Tree, Graph, Sorting, and more!

---

## 📚 NEXT STEPS

1. ✅ Backend running on :8080
2. ✅ Frontend running on :3000
3. 📖 Read [BUILD_AND_RUN.md](BUILD_AND_RUN.md) for detailed guide
4. 📖 Read [FILES_INVENTORY.md](FILES_INVENTORY.md) for code structure
5. 📖 Read [README.md](README.md) for complete documentation

---

## 🔗 USEFUL LINKS

- [Main Documentation](README.md)
- [Build & Run Guide](BUILD_AND_RUN.md)
- [IntelliJ Setup](INTELLIJ_SETUP.md)
- [Files Inventory](FILES_INVENTORY.md)

---

## 💡 TIPS

1. **Keep both terminals open** while developing
2. **Frontend auto-reloads** when you save files
3. **Backend requires restart** when you change Java code
4. **H2 data resets** when backend restarts
5. **Use admin panel** to add more questions

---

## 🎓 FEATURES TO EXPLORE

✨ **MCQ Page**

- Search questions
- Filter by category & difficulty
- See correct answers after submit
- View explanations

✨ **Coding Page**

- Filter by topic & difficulty
- Click solve button
- Opens external platform (LeetCode, HackerRank, etc.)

✨ **Results Page**

- Track all quiz attempts
- Category-wise performance
- Statistics & analytics

✨ **Admin Panel**

- Add new MCQs
- Add new coding problems
- Edit existing content
- Delete questions

---

## ⏱️ TIMING

| Task             | Time             |
| ---------------- | ---------------- |
| Backend startup  | 15-30 seconds    |
| Frontend startup | 10-15 seconds    |
| First API call   | 2-5 seconds      |
| **Total**        | **~1-2 minutes** |

---

## ✅ SUCCESS CHECKLIST

- [x] Backend running on port 8080
- [x] Frontend running on port 3000
- [x] H2 database initialized
- [x] Sample data loaded
- [x] API endpoints responding
- [x] Pages loading correctly
- [x] No console errors

---

## 🆘 STILL STUCK?

1. Check [BUILD_AND_RUN.md](BUILD_AND_RUN.md) for detailed setup
2. Review error messages in console
3. Verify all prerequisites installed
4. Check ports aren't already in use
5. Try restarting both applications

---

## 🎉 YOU'RE READY!

Your Placement Prep Portal is now running!

**Start practicing and ace your placements! 🚀**

---

**Questions?** Check the documentation files or review the code comments.

**Happy Coding!** 💻
