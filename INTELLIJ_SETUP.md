# IntelliJ IDEA Setup Guide for Placement Prep Portal

## Opening the Project in IntelliJ IDEA

### Backend (Spring Boot Application)

1. **Open Backend Module**
   - File → Open
   - Navigate to: `placement prepation website/backend`
   - Click Open
   - Choose "Open as Project" when prompted

2. **Configure JDK**
   - File → Project Structure → Project
   - Set Project SDK to Java 21
   - Apply & OK

3. **Wait for Indexing**
   - Let IntelliJ complete Maven indexing
   - This may take 2-3 minutes first time

4. **Run Backend**
   - Right-click `PlacementPrepPortalApplication.java`
   - Select "Run PlacementPrepPortalApplication"
   - Or use: Shift + F10

5. **Verify Backend**
   - Should see "Started PlacementPrepPortalApplication"
   - Open browser: http://localhost:8080/api/mcqs
   - Should see JSON response with MCQs

### Frontend (React + Vite)

1. **Open Frontend in VS Code**
   - Open a new terminal/VS Code window
   - File → Open Folder
   - Navigate to: `placement prepation website/frontend`
   - Click Select Folder

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Verify Frontend**
   - Open: http://localhost:3000
   - Should see Placement Prep Portal home page

## IntelliJ Configuration Files

### Run Configuration (Optional)

For convenience, you can create a run configuration:

1. Run → Edit Configurations
2. Click + → Spring Boot
3. Name: "Backend"
4. Main class: `com.placementprep.portal.PlacementPrepPortalApplication`
5. Apply & OK

### IDE Settings

**Enable Code Inspection**

- File → Settings → Editor → Inspections
- Enable all Java inspections
- Apply & OK

**Format Code**

- Select code → Code → Reformat Code (Ctrl+Alt+L)

**Auto-import**

- File → Settings → Editor → General → Auto Import
- Enable "Add unambiguous imports on the fly"

## Debugging

### Set Breakpoint

1. Click line number in code editor
2. Run in debug mode: Shift + F9
3. Program will pause at breakpoint
4. Use debug toolbar to step through code

### View Variables

- Variables are shown in Debug panel
- Right-click to evaluate expressions
- Watch tab shows monitored variables

## Common Shortcuts

| Action      | Windows    | Mac       |
| ----------- | ---------- | --------- |
| Run         | Shift+F10  | Ctrl+R    |
| Debug       | Shift+F9   | Ctrl+D    |
| Format      | Ctrl+Alt+L | Cmd+Alt+L |
| Find        | Ctrl+F     | Cmd+F     |
| Replace     | Ctrl+H     | Cmd+H     |
| Go to Class | Ctrl+N     | Cmd+O     |
| Go to Line  | Ctrl+G     | Cmd+G     |

## Troubleshooting

### IntelliJ Doesn't Recognize Maven Project

1. Right-click pom.xml
2. Select "Add as Maven Project"
3. Wait for indexing

### Imports Not Resolving

1. File → Project Structure → Modules
2. Set Source Folder: src/main/java
3. Set Test Folder: src/test/java

### Port Already in Use

1. Find process: `lsof -i :8080`
2. Kill process: `kill -9 <PID>`
3. Or change port in application.properties

### Database Connection Error

- Ensure H2 database is configured
- Check application.properties for correct settings
- Data will auto-create on startup

## Project Structure in IntelliJ

```
backend/ (Right-click → Mark Directory As → Sources Root)
├── pom.xml
├── src/
│   └── main/
│       ├── java/com/placementprep/portal/ (Sources Root)
│       │   ├── entity/
│       │   ├── repository/
│       │   ├── service/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── exception/
│       │   ├── config/
│       │   └── PlacementPrepPortalApplication.java
│       └── resources/ (Resources Root)
│           ├── application.properties
│           └── data.sql

frontend/ (Open in VS Code)
├── package.json
├── vite.config.js
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

## Building for Production

### Backend Build

```bash
# From IntelliJ Terminal
mvn clean package

# JAR file created in target/
java -jar target/placement-prep-portal-1.0.0.jar
```

### Frontend Build

```bash
# From VS Code Terminal
npm run build

# Production files in dist/
```

## Tips & Best Practices

1. **Organize Code**
   - Keep components in separate files
   - Use meaningful file names
   - One component per file

2. **Use IntelliJ Features**
   - Code completion: Ctrl+Space
   - Smart auto-import
   - Refactoring tools

3. **Version Control**
   - Initialize Git: Git → Initialize Repository
   - Commit regularly
   - Use .gitignore

4. **Code Quality**
   - Run inspections regularly
   - Fix warnings/errors before commit
   - Use consistent formatting

## Next Steps

1. ✅ Open backend in IntelliJ
2. ✅ Open frontend in VS Code
3. ✅ Run both applications
4. ✅ Test MCQ functionality
5. ✅ Explore admin panel
6. ✅ Review code structure
7. ✅ Start coding improvements

---

**Happy Coding! 🚀**
