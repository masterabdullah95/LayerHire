import type { Request, Response } from 'express'
import { jobsService } from './jobs.service'
import { sendSuccess, sendError } from '../../utils/apiResponse'
import { asyncHandler } from '../../utils/asyncHandler'
import type { JobFilters } from './jobs.types.ts'

export const jobsController = {

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const filters: JobFilters = {
      search: req.query.search as string,
      type: req.query.type as JobFilters['type'],
      experienceLevel: req.query.experienceLevel as JobFilters['experienceLevel'],
      location: req.query.location as string,
      sortBy: (req.query.sortBy as JobFilters['sortBy']) || 'newest', 
      salaryMin: req.query.salaryMin ? Number(req.query.salaryMin) : undefined, 
      salaryMax: req.query.salaryMax ? Number(req.query.salaryMax) : undefined, 
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
    }

    const result = await jobsService.getAllJobs(filters)
    sendSuccess(res, result)
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const job = await jobsService.getJobById(req.params.id as string)
    sendSuccess(res, job)
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const job = await jobsService.createJob(
      req.body,
      req.user!.id,
      req.user!.name,
    )
    sendSuccess(res, job, 'Job posted successfully', 201)
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const job = await jobsService.updateJob(
      req.params.id as string,
      req.body,
      req.user!.id,
    )
    sendSuccess(res, job, 'Job updated successfully')
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const result = await jobsService.deleteJob(req.params.id as string, req.user!.id)
    sendSuccess(res, result, 'Job deleted successfully')
  }),

  getMyJobs: asyncHandler(async (req: Request, res: Response) => {
    const jobs = await jobsService.getRecruiterJobs(req.user!.id)
    sendSuccess(res, jobs)
  }),
}