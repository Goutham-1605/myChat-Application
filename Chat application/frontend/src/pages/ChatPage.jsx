import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
const username=localStorage.getItem("username");

const socket = io("http://localhost:5000",{
  transports:["websocket"],
}); // your backend server

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup socket on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const msg = { from: username, text: newMessage };
    socket.emit("sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 text-xl font-semibold">
        Chat with your friends 👋
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-xs ${
              msg.from === "username"
                ? "bg-blue-200 self-end ml-auto"
                : "bg-gray-300 self-start mr-auto"
            }`}
          >
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-2 border-t">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;