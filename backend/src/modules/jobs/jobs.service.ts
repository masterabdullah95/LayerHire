import { Job } from './jobs.model'
import type { CreateJobDTO, UpdateJobDTO, JobFilters } from './jobs.types.ts'
import type { SortOrder } from 'mongoose'

export const jobsService = {

  async getAllJobs(filters: JobFilters) {
    const {
      search,
      type,
      experienceLevel,
      location,
      salaryMin,
      salaryMax,
      sortBy = 'newest',
      page = 1,
      limit = 10,
    } = filters

    const query: Record<string, unknown> = { isActive: true }

    if (search) query.$text = { $search: search }
    if (type) query.type = type
    if (experienceLevel) query.experienceLevel = experienceLevel
    if (location) query.location = { $regex: location, $options: 'i' }

    if (salaryMin !== undefined || salaryMax !== undefined) {
      query.salaryMin = {}
      if (salaryMin !== undefined) (query.salaryMin as Record<string, number>).$gte = salaryMin
      if (salaryMax !== undefined) (query.salaryMin as Record<string, number>).$lte = salaryMax
    }

    const sortMap: Record<string, Record<string, SortOrder>> = {
      newest:      { createdAt: -1 },
      oldest:      { createdAt: 1 },
      salary_asc:  { salaryMin: 1 },
      salary_desc: { salaryMin: -1 },
    }

    const skip = (page - 1) * limit

    const [jobs, total] = await Promise.all([
      Job.find(query)
        .sort(sortMap[sortBy])
        .skip(skip)
        .limit(limit)
        .lean(),
      Job.countDocuments(query),
    ])

    return {
      jobs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
    }
  },

  async getJobById(id: string) {
    const job = await Job.findById(id).lean()
    if (!job) throw new Error('Job not found')
    return job
  },

  async createJob(data: CreateJobDTO, recruiterId: string, recruiterName: string) {
    const job = await Job.create({
      ...data,
      recruiterId,
      recruiterName,
    })
    return job
  },

  async updateJob(id: string, data: UpdateJobDTO, recruiterId: string) {
    const job = await Job.findById(id)
    if (!job) throw new Error('Job not found')

    if (job.recruiterId !== recruiterId) {
      throw new Error('Forbidden — you can only edit your own jobs')
    }

    const updated = await Job.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean()

    return updated
  },

  async deleteJob(id: string, recruiterId: string) {
    const job = await Job.findById(id)
    if (!job) throw new Error('Job not found')

    if (job.recruiterId !== recruiterId) {
      throw new Error('Forbidden — you can only delete your own jobs')
    }

    await Job.findByIdAndDelete(id)
    return { message: 'Job deleted successfully' }
  },

  async getRecruiterJobs(recruiterId: string) {
    const jobs = await Job.find({ recruiterId })
      .sort({ createdAt: -1 })
      .lean()
    return jobs
  },
}