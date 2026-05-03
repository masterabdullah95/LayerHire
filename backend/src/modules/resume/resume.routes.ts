import { Router } from 'express'
import multer from 'multer'
import { resumeController } from './resume.controller'
import { protect } from '../../middleware/protect.middleware'

// Use memory storage — we stream the buffer directly to Supabase
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB hard limit
})

const router = Router()

// All routes require auth
router.post('/upload', protect, upload.single('resume'), resumeController.upload)
router.get('/', protect, resumeController.getUrl)
router.delete('/', protect, resumeController.delete)

export default router
