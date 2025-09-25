## Placement Preparation Website

Full-stack project: React + Tailwind (frontend), Node.js + Express + MongoDB (backend).

### Quick Start

Prerequisites: Node 18+, MongoDB running locally.

1. Backend
   - Copy `.env` from the snippet below or create your own.
   - Install deps and seed:
     ```bash
     cd backend
     npm install
     # Create .env
     cat > .env <<'EOF'
     PORT=5000
     MONGO_URI=mongodb://127.0.0.1:27017/placement_prep
     JWT_SECRET=change_this_in_production
     EOF
     npm run seed
     npm run dev
     ```
   - API base: `http://localhost:5000/api`
    - Note: If `MONGO_URI` is not set, the server will boot using an in-memory MongoDB. Data persists only for the lifetime of the process (handy for demos/deploys without Atlas).

2. Frontend
   - See `frontend/README.md` for commands. Start with `npm install && npm run dev`.

### Default Accounts
 - Admin: `admin@example.com` / `Admin@123`
 - User: `student@example.com` / `User@123`

### API Overview
 - `POST /api/auth/signup`, `POST /api/auth/login`
 - `GET /api/resources` (search, filter, sort), `POST/PUT/DELETE` (admin)
 - `GET /api/feedback` (approved only), `POST` (auth)
 - `GET /api/moderation/pending`, `POST /api/moderation/:id/approve|reject` (admin)


