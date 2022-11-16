// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi6nTiGdQo8Ts7VjOusRFeUUo7Fe1ipwk",
  authDomain: "test-fb88e.firebaseapp.com",
  projectId: "test-fb88e",
  storageBucket: "test-fb88e.appspot.com",
  messagingSenderId: "1027365657222",
  appId: "1:1027365657222:web:3c74971c3272eb1080cf07",
  measurementId: "G-CE2CNQS6ZN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const KEY_FIREBASE = process.env.REACT_APP_KEY_FIREBASE

export const fetchToken = (setTokenFound, setToken) => {
  return getToken(messaging, { vapidKey: KEY_FIREBASE }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);

      // send Token Device to sever

      var data = {
        "token": currentToken
      };

      var config = {
        method: 'post',
        url: process.env.REACT_APP_HOST + '/device/add/',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });


      // 
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