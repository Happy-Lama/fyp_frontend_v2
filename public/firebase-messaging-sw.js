
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyDHUQjhL3ZTGRABKBg2O4saS1Ve4StvY_g",
    authDomain: "fyppush-f9a64.firebaseapp.com",
    projectId: "fyppush-f9a64",
    storageBucket: "fyppush-f9a64.appspot.com",
    messagingSenderId: "647988498605",
    appId: "1:647988498605:web:78856978d24976a14b3624",
    measurementId: "G-ZTF7LZETFH"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/favicon.ico'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  