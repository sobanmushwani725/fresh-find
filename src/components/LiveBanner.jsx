import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LiveBanner() {
  const { visitorCount } = useApp();
  const [timeString, setTimeString] = useState(() => new Date().toLocaleTimeString());
  const location = useLocation();

  // Check if current page is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeString(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hide banner completely on login and signup pages
  if (isAuthPage) {
    return null;
  }

  return (
    <div className="bg-theme-dark border-bottom border py-1 small">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-clock me-1 text-accent"></i>
          <span id="liveClock" className="text-accent">Local Time: {timeString}</span>
        </div>
        <div>
          <i className="bi bi-people me-1 text-accent"></i>
          Visitors Today: <span id="visitorCount" className="fw-bold text-accent">{visitorCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}