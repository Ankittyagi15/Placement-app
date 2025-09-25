### Deploy backend on Render

Required env vars on the backend service:
- `MONGO_URI` – e.g., MongoDB Atlas connection string
- `JWT_SECRET` – any random secret

Start command is `npm start` and health check path is `/api/health`.


