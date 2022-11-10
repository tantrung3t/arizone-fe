importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyB8-Uy84gTpma1XOYPoCN9ehwQkQQ6Gc30",
  authDomain: "arizone-13adf.firebaseapp.com",
  projectId: "arizone-13adf",
  storageBucket: "arizone-13adf.appspot.com",
  messagingSenderId: "492931265424",
  appId: "1:492931265424:web:781edb03d08a95c855b915"
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