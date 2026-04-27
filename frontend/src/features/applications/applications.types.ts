export type ApplicationStatus =
  | 'pending'
  | 'reviewing'
  | 'accepted'
  | 'rejected'

export interface IApplication {
  _id: string
  jobId: string
  jobTitle: string
  company: string
  seekerId: string
  seekerName: string
  seekerEmail: string
  recruiterId: string
  coverLetter: string
  resumeUrl?: string | null
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
}

export interface CreateApplicationDTO {
  jobId: string
  coverLetter: string
  resumeUrl?: string
}