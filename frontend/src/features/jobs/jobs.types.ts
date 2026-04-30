export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote'
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead'

export interface IJob {
  _id: string
  title: string
  company: string
  location: string
  type: JobType
  experienceLevel: ExperienceLevel
  salaryMin: number
  salaryMax: number
  description: string
  requirements: string[]
  recruiterId: string
  recruiterName: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface JobFilters {
  search?: string
  type?: JobType
  experienceLevel?: ExperienceLevel
  location?: string
  salaryMin?: number
  salaryMax?: number
  sortBy?: 'newest' | 'oldest' | 'salary_asc' | 'salary_desc'
  page?: number
  limit?: number
}

export interface JobsResponse {
  jobs: IJob[]
  total: number
  page: number
  totalPages: number
  hasNextPage: boolean
}