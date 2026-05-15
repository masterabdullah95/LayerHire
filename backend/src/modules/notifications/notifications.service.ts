import * as generalAdmin from 'firebase-admin';
import admin from 'firebase-admin';
import ServiceAccount from './serviceAccountKey.json';
import { env } from '../../config/env';

export const notificationsService = {

  async sendPushNotification(token: string, title: string, body: string) {
    // Initialize Firebase Admin
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(ServiceAccount as generalAdmin.ServiceAccount),
        });
    }

    const message = {
        token,
        notification: { 
            title, 
            body,
            // Note: 'image' is supported here for large banners, 
        },
        webpush: {
            notification: {
                icon: env.CLIENT_URL + '/google.svg', // Use an absolute URL for reliability
            },
        },
        data: { 
            sentAt: new Date().toISOString() 
        },
    };

    try {
        const response = await admin.messaging().send(message);
        console.log("✅ Notification sent:", response);
    } catch (error) {
        // Check if error is an actual Error object
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        throw new Error("Send failed:" + message);
    }
  },
}