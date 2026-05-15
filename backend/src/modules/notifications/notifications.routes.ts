import { Router } from 'express'
import { notificationsController } from './notifications.controller'
import { protect } from '../../middleware/protect.middleware'

const router = Router()

// All routes require auth
router.put('/', protect, notificationsController.saveFcmToken)

export default router
