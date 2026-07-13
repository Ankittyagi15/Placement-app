# Render Deployment Guide

## Step-by-Step Deployment Instructions

### Prerequisites
- GitHub account with your repo pushed
- Render account (free at https://render.com)

---

## **Option 1: Deploy Using render.yaml (Recommended)**

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. Create Services on Render

#### **Deploy Backend**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the `Placement-app` repo
5. Configure:
   - **Name**: `placement-backend`
   - **Environment**: `Java`
   - **Build Command**: `cd backend && mvn clean package -DskipTests`
   - **Start Command**: `cd backend && java -jar target/placement-prep-portal-1.0.0.jar`
   - **Plan**: Free tier (or Starter)
6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. Copy the URL (e.g., `https://placement-backend.onrender.com`)

#### **Deploy Frontend**
1. Click **"New +"** → **"Static Site"**
2. Connect the same GitHub repo
3. Configure:
   - **Name**: `placement-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Plan**: Free tier
4. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://placement-backend.onrender.com` (from step 8 above)
5. Click **"Create Static Site"**
6. Wait for deployment (3-5 minutes)

---

## **Option 2: Manual Deployment (One service at a time)**

### Backend Deployment
1. Go to Render Dashboard
2. New → Web Service
3. Choose "Deploy existing repo"
4. Fill in:
   ```
   Name: placement-backend
   Runtime: Java
   Build Command: cd backend && mvn clean package -DskipTests
   Start Command: cd backend && java -jar target/placement-prep-portal-1.0.0.jar
   Environments: 
     PORT=8080
   ```
5. Deploy!

### Frontend Deployment
1. New → Static Site
2. Choose your repo
3. Fill in:
   ```
   Name: placement-frontend
   Build Command: cd frontend && npm install && npm run build
   Publish Directory: frontend/dist
   Environment Variables:
     VITE_API_URL=https://placement-backend.onrender.com
   ```
4. Deploy!

---

## **Update Frontend API URL**

After backend is deployed, update the API URL:

### In `frontend/src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});
```

---

## **Environment Variables Reference**

### Backend
| Variable | Value | Notes |
|----------|-------|-------|
| PORT | 8080 | Render sets this automatically |
| JAVA_OPTS | -Xmx512m | Memory limit for free tier |

### Frontend
| Variable | Value | Example |
|----------|-------|---------|
| VITE_API_URL | Backend URL | https://placement-backend.onrender.com |

---

## **Common Issues & Solutions**

### ❌ Backend not starting
- Check if pom.xml has correct Java version (21+)
- Verify Maven dependencies download correctly
- Check logs in Render dashboard

### ❌ Frontend can't reach backend
- Verify CORS is enabled (it is in config)
- Check VITE_API_URL environment variable is set correctly
- Ensure backend service is running (check status in dashboard)

### ❌ Free tier limitations
- Services might spin down after 15 mins of inactivity
- First request takes longer (~30 seconds)
- Limited resources: 0.5GB RAM

**Solution**: Upgrade to Starter plan ($7/month) for continuous running

---

## **Verify Deployment**

### Check Backend
```bash
curl https://placement-backend.onrender.com/api/mcqs
```

### Check Frontend
Visit: `https://placement-frontend.onrender.com`

### Both working together?
- MCQs should load
- You should see data from backend
- Search, filter, and quiz should work

---

## **Redeploy After Changes**

1. Commit and push to GitHub
2. Go to Render Dashboard
3. Click on the service
4. Click "Manual Deploy" → "Deploy latest commit"

Or it auto-deploys if you enable "Auto-Deploy" in settings.

---

## **Scale Up (Optional)**

To remove free tier limitations:
1. Click service on Render
2. Settings → Plan
3. Upgrade to "Starter" ($7/month)
4. Services will run continuously

---

## **Costs**
- **Free**: $0/month (services sleep after 15 min inactivity)
- **Starter**: $7/month per service (always running)

**Recommendation**: Start free, upgrade if needed after testing.
