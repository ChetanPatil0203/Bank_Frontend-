importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBZvl8WZdNdvHvsIM_N7Izff2DK7TZCk8o",
  authDomain: "payzen-bank.firebaseapp.com",
  projectId: "payzen-bank",
  storageBucket: "payzen-bank.firebasestorage.app",
  messagingSenderId: "419558843124",
  appId: "1:419558843124:web:2f1240cfa206fea49574a1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/payzen-logo.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
