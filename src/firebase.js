// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8-Uy84gTpma1XOYPoCN9ehwQkQQ6Gc30",
  authDomain: "arizone-13adf.firebaseapp.com",
  projectId: "arizone-13adf",
  storageBucket: "arizone-13adf.appspot.com",
  messagingSenderId: "492931265424",
  appId: "1:492931265424:web:781edb03d08a95c855b915"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const KEY_FIREBASE = process.env.REACT_APP_KEY_FIREBASE

export const fetchToken = (setTokenFound) => {
    return getToken(messaging, {vapidKey: KEY_FIREBASE}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }
  
  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
  });