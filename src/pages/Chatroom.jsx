import { useState, useEffect } from "react";
import { getMessages, sendMessage, resetChat } from "../firebase/firebaseService";
import "../styles/chatroom.css";

const Chatroom = () => {
  const [name, setName] = useState("");
  const [targetName, setTargetName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (name && targetName) {
      getMessages(name, targetName, setMessages);
    }
  }, [name, targetName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      sendMessage(name, targetName, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      {!name || !targetName ? (
        <div className="name-form">
          <h2>Enter Your Name & Target Name</h2>
          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Target Name"
            onChange={(e) => setTargetName(e.target.value)}
          />
          <button onClick={() => localStorage.setItem("name", name)}>Start Chat</button>
        </div>
      ) : (
        <>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === name ? "my-message" : "other-message"}>
                <span>{msg.sender}: </span>{msg.message}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatroom;
