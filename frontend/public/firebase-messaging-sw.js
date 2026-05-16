importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js",
);

// Load the environment file (reads the dev file locally, reads the overwritten file on live)
importScripts("/sw-env.js");

// Map the keys from the global self.firebaseEnv object
const firebaseConfig = {
  apiKey: self.apiKey,
  authDomain: self.authDomain,
  projectId: self.projectId,
  storageBucket: self.storageBucket,
  messagingSenderId: self.messagingSenderId,
  appId: self.appId,
};

console.log("self.projectId: ", self.projectId);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

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
