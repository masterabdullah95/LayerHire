import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db'
import { auth } from './config/auth'
import { toNodeHandler } from 'better-auth/node'

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL ?? 'http://localhost:5173',
      "http://localhost:5174",
      "https://fullstack-frontend-production.up.railway.app",
    ],
    // methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies / auth headers
  }),
);

app.use(express.json())

// BetterAuth handles all /auth/* routes automatically
app.all('/api/auth/{*any}', toNodeHandler(auth));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', runtime: 'Bun' })
})

// Your API routes go here
// app.use('/api/jobs', jobsRouter)
// app.use('/api/applications', applicationsRouter)

// Global error handler (always last)
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.message)
  res.status(500).json({ success: false, message: err.message })
})

await connectDB()
app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`))