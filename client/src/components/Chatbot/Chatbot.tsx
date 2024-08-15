import React, { useState } from 'react';
import ChatbotService from 'services/ChatbotService';

import "./Chatbot.css";

const Chatbot: React.FC = () => {
  const [message, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const sendQuestion = async () => {
    try {
      const botResponse = await ChatbotService.sendQuestion(message);
      setResponse(botResponse);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='chatbot'>
      <h1>Chatbot</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={sendQuestion}>Send</button>
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
};

export default Chatbot;
