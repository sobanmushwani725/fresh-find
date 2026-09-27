import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import chatbotData from '../data/chatbot.json';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! Ask me what produce is currently in season or where to find markets!',
      link: null
    }
  ]);

  const bodyRef = useRef(null);
  const location = useLocation();

  // Check if current page is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const findBestMatch = (q) => {
    const lowerQ = q.toLowerCase();
    return chatbotData.find(item =>
      item.keywords.some(kw => lowerQ.includes(kw.toLowerCase()))
    );
  };

  const handleUserQuery = (queryText) => {
    if (!queryText.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);

    // Find bot match
    const match = findBestMatch(queryText);
    const answer = match
      ? match.answer
      : "I couldn't find an exact answer. Please explore our Market Directory or Produce Guide!";
    const link = match && match.link ? match.link : null;

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: answer,
          link: link
        }
      ]);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      handleUserQuery(inputQuery);
      setInputQuery('');
    }
  };

  // Hide chatbot completely on login and signup pages
  if (isAuthPage) {
    return null;
  }

  return (
    <div className="chatbot-container position-fixed bottom-0 end-0 me-3 mb-3 z-3">
      {!isOpen && (
        <button
          id="chatbotToggleBtn"
          onClick={() => setIsOpen(true)}
          className="btn rounded-circle shadow-lg p-3 d-flex align-items-center justify-content-center text-white"
          style={{ backgroundColor: '#10b981', width: '56px', height: '56px' }}
          aria-label="Open Chatbot Assistant"
        >
          <i className="bi bi-chat-dots-fill fs-4"></i>
        </button>
      )}

      {isOpen && (
        <div id="chatbotCard" className="card shadow-lg mt-2 bg-body-tertiary">
          <div className="card-header bg-body border-bottom d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="bi bi-robot me-2 fs-5 text-accent" style={{ color: '#10b981' }}></i>
              <div>
                <h6 className="mb-0 fw-bold text-body">FreshFind Assistant</h6>
                <small style={{ color: '#10b981' }}>Online • Static Help</small>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              id="chatbotCloseBtn"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            ></button>
          </div>

          <div id="chatbotBody" ref={bodyRef} className="card-body p-3 overflow-y-auto">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.sender === 'user'
                    ? 'user-msg text-end mb-2 ms-4 p-2 rounded bg-accent text-white small'
                    : 'bot-msg mb-2 me-4 p-2 rounded bg-theme-dark border border-secondary small text-accent'
                }
              >
                <div>{m.text}</div>
                {m.link && (
                  <div className="mt-1">
                    <Link
                      to={m.link}
                      onClick={() => setIsOpen(false)}
                      className="fw-bold text-accent text-decoration-underline"
                    >
                      Click here to view details &rarr;
                    </Link>
                  </div>
                )}
              </div>
            ))}

            <div id="chatbotSuggestions" className="d-flex flex-wrap gap-1 mb-2 mt-3">
              {chatbotData.slice(0, 4).map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="btn btn-outline-accent btn-xs text-start small mb-1 py-1 px-2"
                  style={{ fontSize: '0.75rem' }}
                  onClick={() => handleUserQuery(item.question)}
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>

          <div className="card-footer bg-body border-top p-2">
            <form id="chatbotForm" className="d-flex gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                id="chatbotInput"
                className="form-control form-control-sm bg-body text-body"
                placeholder="Type question..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-sm text-white"
                style={{ backgroundColor: '#10b981' }}
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}