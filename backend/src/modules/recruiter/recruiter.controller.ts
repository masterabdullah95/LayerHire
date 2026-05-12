import type { Request, Response } from 'express'
import { sendSuccess } from '../../utils/apiResponse'
import { asyncHandler } from '../../utils/asyncHandler'
import { recruiterService } from './recruiter.service'

export const recruiterController = {
    
    // PUT /api/recruiter/update/:id
    update: asyncHandler(async (req: Request, res: Response) => {
        const recruiter = await recruiterService.updateRecruiter(
            req.params.id as string,
            req.body,
        )
        sendSuccess(res, recruiter, 'Recruiter updated successfully')
    }),

    // GET /api/recruiter/:id
    getCompanyInfo: asyncHandler(async (req: Request, res: Response) => {
        const recruiter = await recruiterService.getRecruiterInfoById(
            req.params.id as string,
        )
        sendSuccess(res, recruiter, 'Recruiter company info fetched')
    }),
  
}
