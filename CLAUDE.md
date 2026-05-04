# LayerHire — Claude Context File

> A production-grade job listing platform. Users can post, search, apply, and manage jobs with full authentication.
> GitHub: https://github.com/masterabdullah95/LayerHire

---

## Tech Stack

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** BetterAuth (session-based) + Google OAuth
- **File Storage:** Supabase Storage
- **Push Notifications:** Firebase Cloud Messaging (FCM)
- **Containerization:** Docker + docker-compose

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** CSS (custom)
- **HTTP Client:** (update with your actual choice e.g. Axios / fetch)
- **State Management:** (update e.g. Zustand / Redux / Context API)

---

## Monorepo Structure

```
LayerHire/
├── backend/               # Express + TypeScript API server
│   └── src/
│       ├── config/        # DB connection, env config, Firebase/Supabase init
│       ├── controllers/   # Route handler logic
│       ├── models/        # Mongoose schemas
│       ├── routes/        # Express route definitions
│       ├── middlewares/   # Auth guards, error handlers, etc.
│       ├── services/      # Business logic (file upload, notifications, etc.)
│       └── index.ts       # Entry point
├── frontend/              # React + Vite client app
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page-level components (route views)
│       ├── hooks/         # Custom React hooks
│       ├── services/      # API call functions
│       ├── types/         # Shared TypeScript types/interfaces
│       └── main.tsx       # Entry point
├── .env                   # Local secrets (gitignored)
├── .env.example           # Env variable template
├── docker-compose.yml     # Multi-service orchestration
└── CLAUDE.md              # This file
```

> ⚠️ **Note:** Update the structure above whenever you add new folders/files to the repo.

---

## Environment Variables

```env
# Backend
MONGO_URI=mongodb://localhost:27017/jobboard
CLIENT_URL=http://localhost:5173
PORT=5000

# BetterAuth
BETTER_AUTH_SECRET=your_32_char_secret_here
BETTER_AUTH_URL=http://localhost:5000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase (file storage)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key

# Firebase (push notifications)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

---

## API Conventions

- All API routes are prefixed with `/api/v1`
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`
- Always use `async/await` — never `.then()` chains
- Return consistent JSON: `{ success: true, data: ... }` or `{ success: false, message: ... }`
- Never hardcode secrets — always use `process.env.*`

---

## Auth System (BetterAuth)

- Auth is handled by **BetterAuth** library (not manual JWT)
- Supports **email/password** and **Google OAuth**
- BetterAuth manages sessions internally
- Auth middleware should be applied at the route level, not controller level
- Don't re-implement auth logic — use BetterAuth's built-in methods

---

## Key Features Implemented

- [ ] User registration & login (email + Google OAuth)
- [ ] Job posting (employers)
- [ ] Job search & filtering
- [ ] Job applications (job seekers)
- [ ] File uploads via Supabase Storage (e.g. resumes/logos)
- [ ] Push notifications via Firebase FCM
- [ ] Docker-based local development

> ✏️ Check/uncheck items above as features are completed or added.

---

## Coding Conventions

- **Language:** TypeScript everywhere (strict mode preferred)
- **Async:** Always use `async/await`
- **Error handling:** Use try/catch in controllers; propagate errors via middleware
- **Imports:** Use ES module style (`import/export`)
- **Naming:** camelCase for variables/functions, PascalCase for types/interfaces/components
- **No magic strings:** Use constants or enums for repeated string values

---

## Development Setup

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run locally (with Docker)
docker-compose up

# Run without Docker
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

---

## What NOT to do

- Do not commit `.env` — it is gitignored
- Do not bypass BetterAuth with manual JWT logic
- Do not query MongoDB directly from route files — use controllers/services
- Do not add inline styles in React — use CSS classes

---

## Notes for Claude

- This is a **monorepo** — backend and frontend are in separate folders with their own `package.json`
- The project uses **TypeScript on both sides**
- When adding a new feature, follow the existing pattern: `route → controller → service → model`
- When asked to add a new API endpoint, always create/update the corresponding route file, controller, and model
- Supabase is used **only for file storage**, not as the primary database (MongoDB is)
- Firebase is used **only for push notifications**
- Always ask before modifying `.env` or auth-related files
