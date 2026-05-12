import { Router } from 'express'
import { recruiterController } from './recruiter.controller'
import { protect } from '../../middleware/protect.middleware'

const router = Router()

// All routes require auth
router.put('/update/:id', protect, recruiterController.update)
router.get('/:id', protect, recruiterController.getCompanyInfo)

export default router
