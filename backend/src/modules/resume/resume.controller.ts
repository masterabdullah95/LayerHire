import type { Request, Response } from 'express'
import type { Multer } from 'multer'
import { supabase, RESUME_BUCKET } from '../../config/supabase'
import { sendSuccess, sendError } from '../../utils/apiResponse'
import { asyncHandler } from '../../utils/asyncHandler'

// Extend Express Request to include multer's file
type MulterRequest = Request & {
  file?: Express.Multer.File
}

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
]

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export const resumeController = {

  // POST /api/resume/upload
  upload: asyncHandler(async (req: MulterRequest, res: Response): Promise<void> => {
    const user = req.user

    if (!user) {
      sendError(res, 'Unauthorized', 401)
      return
    }

    // multer attaches the file to req.file
    const file = req.file
    if (!file) {
      sendError(res, 'No file provided', 400)
      return
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      sendError(res, 'Only PDF and DOCX files are allowed', 400)
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      sendError(res, 'File size must be under 5 MB', 400)
      return
    }

    // Build a unique path: resumes/<userId>/<timestamp>-<originalname>
    const ext = file.originalname.split('.').pop()
    const fileName = `${Date.now()}-${user.id}.${ext}`
    const filePath = `${user.id}/${fileName}`

    // Delete previous resume if one exists (optional — keeps bucket clean)
    const { data: existing } = await supabase.storage
      .from(RESUME_BUCKET)
      .list(user.id)

    if (existing && existing.length > 0) {
      const oldPaths = existing.map((f) => `${user.id}/${f.name}`)
      await supabase.storage.from(RESUME_BUCKET).remove(oldPaths)
    }

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(RESUME_BUCKET)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      sendError(res, 'Failed to upload resume', 500)
      return
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(RESUME_BUCKET)
      .getPublicUrl(filePath)

    sendSuccess(res, { resumeUrl: urlData.publicUrl }, 'Resume uploaded successfully', 201)
  }),

  // DELETE /api/resume
  delete: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user = req.user

    if (!user) {
      sendError(res, 'Unauthorized', 401)
      return
    }

    const { data: existing } = await supabase.storage
      .from(RESUME_BUCKET)
      .list(user.id)

    if (!existing || existing.length === 0) {
      sendError(res, 'No resume found', 404)
      return
    }

    const paths = existing.map((f) => `${user.id}/${f.name}`)
    const { error } = await supabase.storage.from(RESUME_BUCKET).remove(paths)

    if (error) {
      sendError(res, 'Failed to delete resume', 500)
      return
    }

    sendSuccess(res, null, 'Resume deleted successfully')
  }),

  // GET /api/resume
  getUrl: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user = req.user

    if (!user) {
      sendError(res, 'Unauthorized', 401)
      return
    }

    const { data: existing } = await supabase.storage
      .from(RESUME_BUCKET)
      .list(user.id)

    if (!existing || existing.length === 0) {
      sendSuccess(res, { resumeUrl: null }, 'No resume uploaded')
      return
    }

    const latest = existing[existing.length - 1]

    const { data: urlData } = supabase.storage
      .from(RESUME_BUCKET)
      .getPublicUrl(`${user.id}/${latest.name}`)

    sendSuccess(res, { resumeUrl: urlData.publicUrl }, 'Resume URL fetched')
  }),
}
