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
  createdAt: Date
  updatedAt: Date
}

export interface CreateJobDTO {
  title: string
  company: string
  location: string
  type: JobType
  experienceLevel: ExperienceLevel
  salaryMin: number
  salaryMax: number
  description: string
  requirements: string[]
}

export interface UpdateJobDTO extends Partial<CreateJobDTO> {
  isActive?: boolean
}

export interface JobFilters {
  search?: string
  type?: JobType
  experienceLevel?: ExperienceLevel
  location?: string
  page?: number
  limit?: number
}