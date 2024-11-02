import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const websocket = useRef(null);
  const reconnectTimeout = useRef(null);
  const messagesEndRef = useRef(null);
  const messageIds = useRef(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWebSocket = () => {
    // Only create a new connection if one doesn't exist
    if (websocket.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      websocket.current = new WebSocket('ws://localhost:8080/chat');
      
      websocket.current.onopen = () => {
        console.log('Connected to WebSocket');
        setConnected(true);
        if (reconnectTimeout.current) {
          clearTimeout(reconnectTimeout.current);
          reconnectTimeout.current = null;
        }
      };

      websocket.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          // Generate a unique ID for the message
          const messageId = `${message.timestamp}-${message.sender}-${message.text}`;
          
          // Only add the message if we haven't seen it before
          if (!messageIds.current.has(messageId)) {
            messageIds.current.add(messageId);
            setMessages(prev => [...prev, message]);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      websocket.current.onclose = () => {
        console.log('Disconnected from WebSocket');
        setConnected(false);
        websocket.current = null;
        // Only attempt to reconnect if we haven't already scheduled a reconnection
        if (!reconnectTimeout.current) {
          reconnectTimeout.current = setTimeout(connectWebSocket, 3000);
        }
      };

      websocket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        if (websocket.current) {
          websocket.current.close();
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      websocket.current = null;
      if (!reconnectTimeout.current) {
        reconnectTimeout.current = setTimeout(connectWebSocket, 3000);
      }
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && websocket.current?.readyState === WebSocket.OPEN) {
      const messageObj = {
        text: inputMessage,
        sender: 'You',
        timestamp: new Date().toISOString()
      };
      
      try {
        // Generate a unique ID for the message
        const messageId = `${messageObj.timestamp}-${messageObj.sender}-${messageObj.text}`;
        
        // Add message to local state and message IDs
        if (!messageIds.current.has(messageId)) {
          messageIds.current.add(messageId);
          setMessages(prev => [...prev, messageObj]);
        }
        
        // Send to server for broadcasting to others
        websocket.current.send(JSON.stringify(messageObj));
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        if (websocket.current) {
          websocket.current.close();
        }
      }
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          <h1>Chat App</h1>
          <div className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
            {connected ? 'Connected' : 'Reconnecting...'}
          </div>
        </div>
        
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div 
              key={`${msg.timestamp}-${index}`}
              className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}
            >
              <div className="message-content">
                <span className="message-text">{msg.text}</span>
                <span className="message-sender">{msg.sender}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="input-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
            disabled={!connected}
          />
          <button type="submit" className="send-button" disabled={!connected}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
