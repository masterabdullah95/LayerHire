import type { Request, Response } from 'express'
import { sendError, sendSuccess } from '../../utils/apiResponse'
import { asyncHandler } from '../../utils/asyncHandler'
import { fromNodeHeaders } from "better-auth/node";
import { auth } from '../../config/auth';

export const notificationsController = {
    // PUT /api/notifications/
    saveFcmToken: asyncHandler(async (req: Request, res: Response) => {
        try {
            const updated = await auth.api.updateUser({
                body: {
                    fcmToken: req.body.token,
                },
                headers: fromNodeHeaders(req.headers),
            });
            
            sendSuccess(res, updated, 'FCM Token updated successfully')
        } catch (error) {
            // Check if error is an actual Error object
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            // Pass the message or the verified error object to your helper
            sendError(res, message, 400);
        }
    }),
}
