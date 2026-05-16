// usePushNotifications.js
import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import {PushNotificationUser} from "../types/auth.types";
import { getMessaging } from "firebase/messaging/sw";
import api from '@/lib/axios'
import { app } from '../lib/firebase'; // Your initialized firebase app

export const usePushNotifications = (user: PushNotificationUser | null) => {
  
  useEffect(() => {
    // 1. Register the Service Worker
    const registerServiceWorker = async () => {
      console.log('registering service worker');
      if ('serviceWorker' in navigator) {
        return await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      }
      throw new Error('Service Workers not supported');
    };

    // 2. Get Token and send to Backend
    const saveToken = async (registration: ServiceWorkerRegistration) => {
      try {
        const messaging = getMessaging(app);
        const token = await getToken(messaging, {
          serviceWorkerRegistration: registration,
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID,
        });

        if (token) {
          console.log("FCM Token generated:", token);
          await api.put('/notifications', { token });
        }
      } catch (err) {
        console.error("Failed to get FCM token:", err);
      }
    };

    // 3. Main Orchestrator
    const setupNotifications = async () => {
      if (!user) return;

      try {
        const registration = await registerServiceWorker();
        
        // Check current permission status
        if (Notification.permission === 'granted') {
          await saveToken(registration);
        } else if (Notification.permission !== 'denied') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            await saveToken(registration);
          }
        }
      } catch (error) {
        console.error("Notification setup failed:", error);
      }
    };

    setupNotifications();
  }, [user]);
};
