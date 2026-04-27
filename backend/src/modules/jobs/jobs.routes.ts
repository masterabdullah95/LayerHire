import { Router } from 'express'
import { jobsController } from './jobs.controller'
import { protect, requireRecruiter } from '../../middleware/protect.middleware'

const router = Router()

// Public routes
router.get('/', jobsController.getAll)
router.get('/:id', jobsController.getById)

// Recruiter only
router.post('/', requireRecruiter, jobsController.create)
router.put('/:id', requireRecruiter, jobsController.update)
router.delete('/:id', requireRecruiter, jobsController.delete)
router.get('/recruiter/my-jobs', protect, jobsController.getMyJobs)

export default router