importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyDJuUSvZYK62d3iHrTHzukDBTZAi4e6FNk",
  authDomain: "layerhire-local.firebaseapp.com",
  projectId: "layerhire-local",
  storageBucket: "layerhire-local.firebasestorage.app",
  messagingSenderId: "599682064114",
  appId: "1:599682064114:web:78de68a83d105917e07a6b",
};

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
