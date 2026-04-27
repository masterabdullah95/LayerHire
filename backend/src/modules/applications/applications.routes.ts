import { Router } from 'express'
import { applicationsController } from './applications.controller'
import { protect, requireRecruiter } from '../../middleware/protect.middleware'

const router = Router()

// Seeker routes
router.post('/', protect, applicationsController.apply)
router.get('/my', protect, applicationsController.getMySeekerApplications)
router.get('/check/:jobId', protect, applicationsController.checkApplied)

// Recruiter routes
router.get('/recruiter', requireRecruiter, applicationsController.getRecruiterApplications)
router.get('/stats', requireRecruiter, applicationsController.getStats)
router.patch('/:id/status', requireRecruiter, applicationsController.updateStatus)

export default router