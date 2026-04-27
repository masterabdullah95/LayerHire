export type Role = 'seeker' | 'recruiter'

export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string | null
  role: Role
  createdAt: string
  updatedAt: string
}

export interface Session {
  id: string
  userId: string
  expiresAt: string
  token: string
}

export interface ApiResponse<T = null> {
  success: boolean
  message: string
  data: T
}