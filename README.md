# JobBoard — Full Stack Job Listing Platform

A production-grade job board application built with the MERN stack and modern tooling. Recruiters can post and manage job listings, job seekers can browse, search, and apply — all with role-based access control, Google OAuth, and a clean responsive UI.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Role System](#role-system)
- [Screenshots](#screenshots)
- [Docker](#docker)
- [Roadmap](#roadmap)

---

## Features

### Job Seekers

- Browse and search all active job listings
- Filter by job title, type, experience level, salary, and location
- Sort by newest, oldest, salary high and low
- View full job details with requirements and salary range
- Can upload resume on profile page
- Apply with a cover letter, CV attach automatically — one application per job enforced
- Track all applications and their status in real time
- Seeker will get push notifications on job application status change

### Recruiters

- Post new job listings with full details and skill tags
- Manage all posted jobs (edit, delete, toggle active)
- View all incoming applications in a dashboard along with CVs
- Update application status — pending, reviewing, accepted, rejected
- Application stats overview with live counts
- When recruiter changes application status, push notifications will be sent to the seeker

### General

- Email/password registration and login
- Google OAuth — single click sign in and sign up
- Github OAuth — single click sign in and sign up
- Role-based access control throughout the app
- Fully responsive UI across all screen sizes
- Persistent sessions via secure cookies

---

## Tech Stack

### Frontend

| Technology                 | Purpose                      |
| -------------------------- | ---------------------------- |
| React 19 + TypeScript      | UI framework                 |
| Vite + Bun                 | Build tool and dev server    |
| React Router v7            | Client-side routing          |
| Redux Toolkit              | Global state management      |
| TailwindCSS v4             | Utility-first styling        |
| Shadcn/ui + Radix          | Accessible component library |
| Lucide React               | Icon library                 |
| Axios                      | HTTP client                  |
| BetterAuth (client)        | Session management           |
| Firebase Push Notification | Firebase Push Notification   |

### Backend

| Technology                 | Purpose                                |
| -------------------------- | -------------------------------------- |
| Express + TypeScript       | REST API server                        |
| Bun                        | JavaScript runtime and package manager |
| MongoDB + Mongoose         | Database and ODM                       |
| BetterAuth                 | Authentication (email + Google OAuth)  |
| MongoDB Native Driver      | BetterAuth database adapter            |
| Firebase Push Notification | Firebase Push Notification             |

### DevOps

| Technology              | Purpose                  |
| ----------------------- | ------------------------ |
| Docker + Docker Compose | Containerization         |
| ESModules               | Module system throughout |

---

## Project Structure

```
LayerHire/
├── backend/                        # Express + TypeScript API server
│   └── src/
│       ├── config/                 # DB connection, env config, Firebase/Supabase init, Better Auth
│       │   ├── auth.ts             # BetterAuth instance and config
│       │   ├── db.ts               # MongoDB connection
│       │   ├── env.ts              # Environment variable validation
│       │   └── supabase.ts         # Supabase initialization and config
│       ├── middleware/             # Auth guards, error handlers, protected routes middlewares etc.
│       │   ├── protect.middleware.ts   # Auth guard + role guard + protected routes middleware
│       │   └── error.middleware.ts     # Global error handler
│       ├── modules/
│       │   ├── jobs/               # Job module
│       │   │   ├── jobs.model.ts
│       │   │   ├── jobs.types.ts
│       │   │   ├── jobs.service.ts
│       │   │   ├── jobs.controller.ts
│       │   │   └── jobs.routes.ts
│       │   ├── applications/       # Applications module
│       │   │   ├── applications.model.ts
│       │   │   ├── applications.types.ts
│       │   │   ├── applications.service.ts
│       │   │   ├── applications.controller.ts
│       │   │   └── applications.routes.ts
│       │   ├── recruiter/       # Recruiter module
│       │   │   ├── recruiter.model.ts
│       │   │   ├── recruiter.types.ts
│       │   │   ├── recruiter.service.ts
│       │   │   ├── recruiter.controller.ts
│       │   │   └── recruiter.routes.ts
│       │   ├── notifications/       # Notifications module
│       │   │   ├── notifications.service.ts
│       │   │   ├── notifications.controller.ts
│       │   │   └── notifications.routes.ts
│       │   └── resume/             # Resume module
│       │       ├── resume.controller.ts
│       │       └── resume.routes.ts
│       ├── utils/
│       │   ├── asyncHandler.ts     # Async route wrapper
│       │   └── apiResponse.ts      # Consistent response helpers
│       └── server.ts               # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                 # Shadcn generated components
│   │   │   └── shared/             # Navbar, Layout, ProtectedRoute, JobCard
│   │   │       ├── Footer.tsx
│   │   │       ├── JobCard.tsx
│   │   │       ├── Layout.tsx      # Main layout
│   │   │       ├── Navbar.tsx
│   │   │       ├── ProtectedRoute.tsx   # Protected layout
│   │   │       └── ResumeUpload.tsx     # Resume upload component
│   │   ├── features/
│   │   │   ├── auth/                    # Login, Register, auth slice
│   │   │   │   ├── auth.slice.ts
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── RegisterPage.tsx
│   │   │   ├── jobs/                    # Jobs slice and types
│   │   │   │   ├── EditJobModal.tsx
│   │   │   │   ├── jobs.slice.ts
│   │   │   │   └── jobs.types.ts
│   │   │   └── applications/            # ApplyModal, applications slice
│   │   │       ├── applications.slice.ts
│   │   │       ├── applications.types.ts
│   │   │       └── ApplyModal.ts
│   │   ├── hooks/                  # useAuth, useJobs, useApplications
│   │   │   ├── useApplications.ts
│   │   │   ├── useAuth.ts
│   │   │   └── useJobs.ts
│   │   ├── lib/                    # Axios instance, auth client
│   │   │   ├── auth-client.ts
│   │   │   ├── axios.ts
│   │   │   ├── resume.api.ts
│   │   │   └── utils.ts
│   │   ├── pages/                  # JobsPage, JobDetailPage, PostJobPage, etc.
│   │   │   ├── AboutPage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   ├── CareersPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── JobDetailPage.tsx
│   │   │   ├── JobsPage.tsx
│   │   │   ├── MyApplicationsPage.tsx
│   │   │   ├── PostJobPage.tsx
│   │   │   ├── PrivacyPolicyPage.tsx
│   │   │   ├── RecruiterDashboard.tsx
│   │   │   ├── SeekerDashboard.tsx
│   │   │   └── TermsOfServicePage.tsx
│   │   ├── store/                  # Redux store
│   │   │   └── index.ts
│   │   ├── types/                  # Shared TypeScript interfaces
│   │   │   ├── auth.types.ts
│   │   │   └── index.ts
│   │   ├── App.tsx                 # Router setup
│   │   └── main.tsx                # App entry point with providers
│   ├── public/
│   │   ├── firebase-messaging-sw.js
│   │   └── sw-env.js
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have these installed:

- [Bun](https://bun.sh) v1.0 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) running locally or a MongoDB Atlas URI
- [Docker](https://www.docker.com) (optional — for containerized setup)
- A [Google Cloud Console](https://console.cloud.google.com) project with OAuth credentials

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/job-board.git
cd job-board
```

2. Install backend dependencies

```bash
cd backend && bun install
```

3. Install frontend dependencies

```bash
cd ../frontend && bun install
```

### Environment Variables

**Backend** — create `backend/.env` from the example:

```bash
cp .env.example backend/.env
```

```env
# Server
PORT=3000
MONGO_URI=mongodb://localhost:27017/jobboard
CLIENT_URL=http://localhost:5173

# BetterAuth
BETTER_AUTH_SECRET=your_32_character_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Github OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Supabase (Phase 5 — resume uploads)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key

# Firebase (Phase 6 — push notifications)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

**Frontend** — create `frontend/.env`:

```bash
cp .env.example frontend/.env
```

```env
VITE_API_URL=http://localhost:3000
VITE_APP_URL=http://localhost:5173
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket

In firebase console, Web Push certificates -> Key pair value is VAPID
VITE_FIREBASE_VAPID
```

#### On production for Firebase

- firebase-messaging-sw.js is already added to frontend/public folder
- Add below scripts in package.json

```bash
"build:env": "echo \"self.apiKey = '$VITE_FIREBASE_API_KEY'; self.authDomain = '$VITE_FIREBASE_AUTH_DOMAIN'; self.projectId = '$VITE_FIREBASE_PROJECT_ID'; self.storageBucket = '$VITE_FIREBASE_STORAGE_BUCKET'; self.messagingSenderId = '$VITE_FIREBASE_MESSAGING_SENDER_ID'; self.appId = '$VITE_FIREBASE_APP_ID';\" > public/sw-env.js",
    "build": "tsc -b && npm run build:env && vite build",
```

#### Setting up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
4. Set **Authorized JavaScript origins** to `http://localhost:5173`
5. Set **Authorized redirect URIs** to `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret into your `backend/.env`

### Running Locally

```bash
# Terminal 1 — start the backend
cd backend && bun dev

# Terminal 2 — start the frontend
cd frontend && bun dev
```

| Service      | URL                              |
| ------------ | -------------------------------- |
| Frontend     | http://localhost:5173            |
| Backend API  | http://localhost:3000            |
| Health check | http://localhost:3000/api/health |

---

## API Reference

All API responses follow this shape:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

### Jobs

| Method   | Endpoint                      | Auth          | Description                     |
| -------- | ----------------------------- | ------------- | ------------------------------- |
| `GET`    | `/api/jobs`                   | Public        | Get all jobs (supports filters) |
| `GET`    | `/api/jobs/:id`               | Public        | Get job by ID                   |
| `POST`   | `/api/jobs`                   | Recruiter     | Create a new job                |
| `PUT`    | `/api/jobs/:id`               | Recruiter     | Update a job                    |
| `DELETE` | `/api/jobs/:id`               | Recruiter     | Delete a job                    |
| `GET`    | `/api/jobs/recruiter/my-jobs` | Authenticated | Get current recruiter's jobs    |

**Query parameters for `GET /api/jobs`:**

| Param             | Type   | Description                                                          |
| ----------------- | ------ | -------------------------------------------------------------------- |
| `search`          | string | Full-text search on title, company, description                      |
| `type`            | string | `full-time` \| `part-time` \| `contract` \| `internship` \| `remote` |
| `experienceLevel` | string | `entry` \| `mid` \| `senior` \| `lead`                               |
| `location`        | string | Partial match on location                                            |
| `page`            | number | Page number (default: 1)                                             |
| `limit`           | number | Results per page (default: 10)                                       |

### Applications

| Method  | Endpoint                         | Auth      | Description                      |
| ------- | -------------------------------- | --------- | -------------------------------- |
| `POST`  | `/api/applications`              | Seeker    | Apply to a job                   |
| `GET`   | `/api/applications/my`           | Seeker    | Get my applications              |
| `GET`   | `/api/applications/check/:jobId` | Seeker    | Check if already applied         |
| `GET`   | `/api/applications/recruiter`    | Recruiter | Get all applications for my jobs |
| `GET`   | `/api/applications/stats`        | Recruiter | Get application status counts    |
| `PATCH` | `/api/applications/:id/status`   | Recruiter | Update application status        |

---

## Authentication

This project uses [BetterAuth](https://better-auth.com) for authentication.

- **Email/Password** — standard register and login flow
- **Google OAuth** — one-click sign in and sign up
- **Sessions** — stored in MongoDB, persisted via HTTP-only cookies
- **Session duration** — 7 days, refreshed if older than 1 day

BetterAuth automatically creates and manages these MongoDB collections:

```
users           email, name, role, emailVerified, image
sessions        token, userId, expiresAt, userAgent
accounts        OAuth provider data (Google)
verifications   email verification tokens
```

---

## Role System

Every user is assigned a role at registration:

| Role        | Access                                                   |
| ----------- | -------------------------------------------------------- |
| `seeker`    | Browse jobs, apply, track applications                   |
| `recruiter` | Post jobs, manage listings, view and update applications |

Routes are protected at both the API level (via `protect` and `requireRecruiter` middleware) and the UI level (via the `ProtectedRoute` component with an optional `allowedRole` prop).

---

## Docker

Run the entire stack with a single command:

```bash
docker-compose up --build
```

This starts three containers — frontend (nginx), backend (Bun), and MongoDB — all networked together.

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

---

## Roadmap

- [x] Phase 1 — Authentication (BetterAuth + Google OAuth + roles)
- [x] Phase 2 — Jobs module (CRUD + search + filters + pagination)
- [x] Phase 3 — Applications module (apply, track, recruiter dashboard)
- [x] Phase 4 — Docker (containerize frontend + backend + MongoDB)
- [x] Phase 5 — Supabase (resume PDF/docx uploads)
- [x] Phase 6 — Firebase (push notifications on job application status change)
- [x] Phase 7 — Deployment (Render)

---

## License

MIT
