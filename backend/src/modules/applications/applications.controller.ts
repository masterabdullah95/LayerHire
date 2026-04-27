import type { Request, Response } from 'express'
import { applicationsService } from './applications.service'
import { sendSuccess, sendError } from '../../utils/apiResponse'
import { asyncHandler } from '../../utils/asyncHandler'

export const applicationsController = {

  apply: asyncHandler(async (req: Request, res: Response) => {
    const application = await applicationsService.apply(
      req.body,
      req.user!.id,
      req.user!.name,
      req.user!.email,
    )
    sendSuccess(res, application, 'Application submitted successfully', 201)
  }),

  getMySeekerApplications: asyncHandler(async (req: Request, res: Response) => {
    const applications = await applicationsService.getSeekerApplications(
      req.user!.id
    )
    sendSuccess(res, applications)
  }),

  getRecruiterApplications: asyncHandler(async (req: Request, res: Response) => {
    const jobId = req.query.jobId as string | undefined
    const applications = await applicationsService.getRecruiterApplications(
      req.user!.id,
      jobId
    )
    sendSuccess(res, applications)
  }),

  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    const application = await applicationsService.updateStatus(
      req.params.id as string,
      req.body,
      req.user!.id
    )
    sendSuccess(res, application, 'Application status updated')
  }),

  checkApplied: asyncHandler(async (req: Request, res: Response) => {
    const hasApplied = await applicationsService.hasApplied(
      req.params.jobId as string,
      req.user!.id
    )
    sendSuccess(res, { hasApplied })
  }),

  getStats: asyncHandler(async (req: Request, res: Response) => {
    const stats = await applicationsService.getApplicationStats(req.user!.id)
    sendSuccess(res, stats)
  }),
}