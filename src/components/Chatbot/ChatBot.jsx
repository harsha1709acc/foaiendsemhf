import { useState, useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <>
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
        title="AI Assistant"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-avatar">🤖</span>
              <div>
                <h4>Dashboard AI</h4>
                <p className="chatbot-subtitle">Powered by Mistral-7B</p>
              </div>
            </div>
            <button className="chatbot-clear" onClick={clearChat} title="Clear chat">
              🗑️
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                <p>👋 Hi! I can answer questions about:</p>
                <ul>
                  <li>🛰️ ISS location & speed</li>
                  <li>📰 News articles</li>
                  <li>👨‍🚀 People in space</li>
                </ul>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${msg.role === 'user' ? 'chat-user' : 'chat-bot'} ${msg.isError ? 'chat-error' : ''}`}
              >
                <div className="chat-bubble">
                  {msg.content}
                </div>
                <span className="chat-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message chat-bot">
                <div className="chat-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask about ISS or News..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button
              type="submit"
              className="btn btn-send"
              disabled={!input.trim() || isTyping}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
