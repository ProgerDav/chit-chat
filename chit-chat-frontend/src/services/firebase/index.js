import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCzwWVrKDfUltVaNjqK8DUECYqjECrU4JY",
  authDomain: "chit-chat-9f623.firebaseapp.com",
  databaseURL: "https://chit-chat-9f623.firebaseio.com",
  projectId: "chit-chat-9f623",
  storageBucket: "chit-chat-9f623.appspot.com",
  messagingSenderId: "490975414709",
  appId: "1:490975414709:web:8940609003d16093fa31fc",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const storageBaseUrl = "gs://chit-chat-9f623.appspot.com/";

// const firebaseStorage = firebase.storage().ref();
const firebaseStorage = app.storage(storageBaseUrl).ref("/room-images/");

export { auth, googleAuthProvider, storageBaseUrl, firebaseStorage };
