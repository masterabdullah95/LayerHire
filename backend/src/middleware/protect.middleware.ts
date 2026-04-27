import type { Request, Response, NextFunction } from 'express'
import { auth } from '../config/auth'
import { sendError } from '../utils/apiResponse'
import { fromNodeHeaders } from 'better-auth/node'

// Extend Express Request type to include user + session
declare global {
  namespace Express {
    interface Request {
      user?: typeof auth.$Infer.Session.user
      session?: typeof auth.$Infer.Session.session
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (!session) {
      sendError(res, 'Unauthorized — please log in', 401)
      return
    }

    req.user = session.user
    req.session = session.session
    next()

  } catch {
    sendError(res, 'Unauthorized', 401)
  }
}

// Use this on routes only accessible by recruiters
export const requireRecruiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await protect(req, res, async () => {
    if (req.user?.role !== 'recruiter') {
      sendError(res, 'Forbidden — recruiters only', 403)
      return
    }
    next()
  })
}