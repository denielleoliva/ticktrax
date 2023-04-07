

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getBlob, getStorage, ref} from "firebase/storage";
import {getMessaging, getToken} from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHDvhNaCQEvcyoPEKfQCPttH1Os3bd2M4",
  authDomain: "ticktrax-3dc7a.firebaseapp.com",
  projectId: "ticktrax-3dc7a",
  storageBucket: "ticktrax-3dc7a.appspot.com",
  messagingSenderId: "749973724108",
  appId: "1:749973724108:web:bd5de2584679d3379a9b69",
  measurementId: "G-ZLV4QCZZB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://ticktrax-3dc7a.appspot.com");
const gsReference = ref(storage, 'gs://ticktrax-3dc7a.appspot.com/counties_ld.json');
const users = ref(storage, 'gs://ticktrax-3dc7a.appspot.com/users.json');

export const FirebaseDB = getFirestore(app);
export const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);


export async function requestPermission() {
  console.log('Requesting permission...');
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const messaging = getMessaging(app);
    console.log('Notification permission granted.');
    return await getToken(messaging, {vapidKey: 'BMh6Rb47tF3MqzwiPlpi0l9LuUW3KbG8o8rEzNDZLrsZRKzdUQuUL3Ho057U37dB7NLLro-0n7QL5bKrLyqPmM0'});
  }

  console.warn('Notification permission not granted.');
  return new Promise((resolve) => resolve(false));
}
// getToken(messaging, {vapidKey: 'BMh6Rb47tF3MqzwiPlpi0l9LuUW3KbG8o8rEzNDZLrsZRKzdUQuUL3Ho057U37dB7NLLro-0n7QL5bKrLyqPmM0'})
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log('currentToken:', currentToken);
//     } else {
//       console.log('bad');
//     }
//   });

export async function getLymeDiseaseByCountiesData() {
  return getBlob(gsReference);
}

export async function getUsers() {
  return getBlob(users);
}




