import { env } from './config/env' // ← must be first, validates all env vars
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db'
import { auth } from './config/auth'
import { toNodeHandler } from 'better-auth/node'
import { errorHandler } from './middleware/error.middleware'
import jobsRouter from './modules/jobs/jobs.routes'
import applicationsRouter from './modules/applications/applications.routes'
import resumeRouter from './modules/resume/resume.routes'  // ← Phase 5

const app = express()
const PORT: number = parseInt(env.PORT || '3000', 10);

app.use(express.json())
app.set('trust proxy', 1); // Trust first proxy

app.use(
  cors({
    origin: [
      env.CLIENT_URL ?? 'http://localhost:5173',
      'https://layerhire.up.railway.app',
      'layerhire-api.up.railway.app'
    ],
    // methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true, // allow cookies, auth headers, required — betterauth uses cookies
  }),
);

// BetterAuth handles all /auth/* routes automatically
app.all('/api/auth/{*any}', toNodeHandler(auth));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Server is running', data: null })
})

app.use('/api/jobs', jobsRouter)       // ← Job router
app.use('/api/applications', applicationsRouter)   // ← Applications router
app.use('/api/resume', resumeRouter)   // ← Phase 5

// ── Global Error Handler (always last) ───────────────
app.use(errorHandler)

// ── Start ─────────────────────────────────────────────
await connectDB()
const HOST = env.HOST || '0.0.0.0';
// app.listen(PORT, HOST, () => console.log(`✓ Server running on https://${HOST}:${PORT}`))
app.listen(PORT, () => console.log(`✓ Server running on http://${HOST}:${PORT}`))