importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAi6nTiGdQo8Ts7VjOusRFeUUo7Fe1ipwk",
  authDomain: "test-fb88e.firebaseapp.com",
  projectId: "test-fb88e",
  storageBucket: "test-fb88e.appspot.com",
  messagingSenderId: "1027365657222",
  appId: "1:1027365657222:web:3c74971c3272eb1080cf07",
  measurementId: "G-CE2CNQS6ZN"
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // self.registration.showNotification(notificationTitle,
  //   notificationOptions);
});