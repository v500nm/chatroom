import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVdVeiZ5-UdFVgpMmqTlp6xCYQE1tSXIk",
  authDomain: "chatroom-cafc5.firebaseapp.com",
  projectId: "chatroom-cafc5",
  storageBucket: "chatroom-cafc5.firebasestorage.app",
  messagingSenderId: "629834151606",
  appId: "1:629834151606:web:0519a7f2daff81a2969817"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };