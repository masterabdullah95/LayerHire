importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js",
);

// Load the environment file (reads the dev file locally, reads the overwritten file on live)
importScripts("/sw-env.js");

// Add a defensive fallback check to ensure variables are fully mapped
if (typeof self.firebaseEnv !== "undefined" && self.firebaseEnv.PROJECT_ID) {
  // Map the keys from the global self.firebaseEnv object
  const firebaseConfig = {
    apiKey: self.firebaseEnv.API_KEY,
    authDomain: self.firebaseEnv.AUTH_DOMAIN,
    projectId: self.firebaseEnv.PROJECT_ID,
    storageBucket: self.firebaseEnv.STORAGE_BUCKET,
    messagingSenderId: self.firebaseEnv.MESSAGING_SENDER_ID,
    appId: self.firebaseEnv.APP_ID,
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
} else {
  console.error(
    "Firebase Service Worker: self.firebaseEnv config keys are missing or delayed.",
  );
}

// Handle background messages (when tab is not in focus)
// messaging.onBackgroundMessage((payload) => {
//   console.log("[SW] Background message received:", payload);

//   // Show OS popup notification
//   const { title, body } = payload.notification;
//   return self.registration.showNotification(title, {
//     body,
//     icon: payload.notification.icon || "/google.svg", // Ensure this exists in your public folder
//   });
// });
