import { useState, useCallback, useEffect } from 'react';
import { chatWithAI } from '../utils/api';
import { getJSON, setJSON } from '../utils/storage';
import { useDashboard } from '../context/DashboardContext';

const MAX_MESSAGES = 30;
const STORAGE_KEY = 'chatbot-messages';

export function useChat() {
  const { getDashboardContext } = useDashboard();
  const [messages, setMessages] = useState(() => getJSON(STORAGE_KEY) || []);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setJSON(STORAGE_KEY, messages.slice(-MAX_MESSAGES));
  }, [messages]);

  const sendMessage = useCallback(
    async (content) => {
      console.log('Chatbot: Sending message...', content);
      const userMsg = { role: 'user', content, timestamp: Date.now() };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);
      setError(null);

      try {
        const context = getDashboardContext();
        console.log('Chatbot: Context gathered (length):', context.length);
        const response = await chatWithAI([...messages, userMsg], context);
        console.log('Chatbot: Response received:', response);
        const botMsg = { role: 'assistant', content: response, timestamp: Date.now() };
        setMessages((prev) => [...prev, botMsg].slice(-MAX_MESSAGES));
      } catch (err) {
        console.error('Chatbot: Error occurred:', err);
        setError(err.message);
        const errMsg = {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${err.message}`,
          timestamp: Date.now(),
          isError: true,
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, getDashboardContext]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, isTyping, error, sendMessage, clearChat };
}
