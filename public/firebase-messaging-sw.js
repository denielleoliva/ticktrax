importScripts(
  "https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCHDvhNaCQEvcyoPEKfQCPttH1Os3bd2M4",
  authDomain: "ticktrax-3dc7a.firebaseapp.com",
  projectId: "ticktrax-3dc7a",
  storageBucket: "ticktrax-3dc7a.appspot.com",
  messagingSenderId: "749973724108",
  appId: "1:749973724108:web:bd5de2584679d3379a9b69",
  measurementId: "G-ZLV4QCZZB7"
};

try {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  console.log('helloo', messaging)

  messaging.onBackgroundMessage(function (payload) {
    const channel = new BroadcastChannel('sw-messages');
    channel.postMessage(payload);


  });
}
catch (err) {
    console. log (err);
  }


// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../firebase-messaging-sw.js')
//     .then(function(registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     }).catch(function(err) {
//     console.log('Service worker registration failed, error:', err);
//   });
// }
