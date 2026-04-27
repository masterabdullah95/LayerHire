import { env } from './config/env' // ← must be first, validates all env vars
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db'
import { auth } from './config/auth'
import { toNodeHandler } from 'better-auth/node'
import { errorHandler } from './middleware/error.middleware'
import jobsRouter from './modules/jobs/jobs.routes'

const app = express()
const PORT = env.PORT ?? 5000

app.use(
  cors({
    origin: [
      env.CLIENT_URL ?? 'http://localhost:5173',
    ],
    // methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies, auth headers, required — betterauth uses cookies
  }),
);

app.use(express.json())

// BetterAuth handles all /auth/* routes automatically
app.all('/api/auth/{*any}', toNodeHandler(auth));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Server is running', data: null })
})

app.use('/api/jobs', jobsRouter)       // Job router

// Your API routes go here
// app.use('/api/jobs', jobsRouter)
// app.use('/api/applications', applicationsRouter)

// ── Global Error Handler (always last) ───────────────
app.use(errorHandler)

// ── Start ─────────────────────────────────────────────
await connectDB()
app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`))