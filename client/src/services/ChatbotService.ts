import axios from 'axios';
import API_URL from '../config';

const ChatbotService = {
  /**
   * Sends a question to the server.
   * @param message The question to send.
   * @returns The response from the server.
   */
  sendQuestion: async (message: string): Promise<string> => {
    try {
      // Construct the URL dynamically with the message as a path parameter
      const url = `${API_URL}/answer/${encodeURIComponent(message)}`;

      // Make a GET request to the constructed URL
      const response = await axios.get(url);
      return response.data.response;
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      throw error;
    }
  }
};

export default ChatbotService;
