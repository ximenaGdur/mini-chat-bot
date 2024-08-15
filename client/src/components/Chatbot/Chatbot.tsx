import React, { useState } from 'react';
import ChatbotService from 'services/ChatbotService';

import "./Chatbot.css";

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  /**
   * Sets question in html.
   * @returns {Node} Node created with question.
   */
  const setQuestion = (): Node => {
    const answerElement = document.createElement("p");
    answerElement.setAttribute("class", "user-text");
    answerElement.innerHTML = message;

    setMessage('');
    return answerElement;
  }

  /**
   * Sets answer in html.
   * @param {string} Message sent by server with response.
   * @returns {Node} Node created with answer.
   */
  const setAnswer = (message: string): Node => {
    message = message.replace(/\n/g, "<br />");
    const questionElement = document.createElement("p");
    questionElement.setAttribute("class", "bot-text");
    questionElement.innerHTML = message;
    return questionElement;
  }

  /**
   * Sends question that user asked to server and displays answer.
   */
  const sendQuestion = async () => {
    const chatArea = document.getElementById("chat-area");
    if (chatArea) {
      try {
        chatArea.appendChild(setQuestion());
        const botResponse = await ChatbotService.sendQuestion(message);
        chatArea.appendChild(setAnswer(botResponse));

        setMessage('');
      } catch (err) {
        const errorElement = document.createElement("p");
        errorElement.innerHTML = "Try again later!";
        chatArea.appendChild(errorElement);
      }
    }
  };

  /**
   * Changes display of chat.
   */
  const openChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className='chatbot p-1'>
      <button id='chatbot-button' onClick={openChat}>
        {isChatOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      <div id='chatbot-content' style={{ display: isChatOpen ? 'flex' : 'none', flexDirection: 'column' }}>
        <div id="chat-area">
        </div>
        <textarea
          className="text-area"
          id="textArea"
          rows={2}
          maxLength={100}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={sendQuestion} className="chatbot-sendbutton">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
