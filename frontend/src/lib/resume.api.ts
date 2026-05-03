import api from '@/lib/axios'

export interface ResumeUploadResponse {
  resumeUrl: string
}

/** Upload a PDF or DOCX resume file. Returns the public Supabase URL. */
export const uploadResume = async (file: File): Promise<ResumeUploadResponse> => {
  const formData = new FormData()
  formData.append('resume', file)

  const { data } = await api.post<{ success: boolean; data: ResumeUploadResponse }>(
    '/resume/upload',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )

  return data.data
}

/** Get the current user's resume URL (null if none uploaded). */
export const getResumeUrl = async (): Promise<string | null> => {
  const { data } = await api.get<{ success: boolean; data: { resumeUrl: string | null } }>(
    '/resume'
  )
  return data.data.resumeUrl
}

/** Delete the current user's resume from Supabase Storage. */
export const deleteResume = async (): Promise<void> => {
  await api.delete('/resume')
}
