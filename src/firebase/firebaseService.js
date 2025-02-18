import { db } from "./firebaseConfig"; // Ensure firebaseConfig.js exists
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc } from "firebase/firestore";

// Function to fetch messages
export const getMessages = (callback) => {
  const q = query(collection(db, "messages"), orderBy("timestamp"));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

// Function to send message
export const sendMessage = async (name, targetName, text) => {
  await addDoc(collection(db, "messages"), {
    sender: name,
    target: targetName,
    text,
    timestamp: new Date(),
  });
};

// Function to reset chat after 12 hours
export const resetChat = async () => {
  const messagesRef = collection(db, "messages");
  const snapshot = await getDocs(messagesRef);
  snapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};
