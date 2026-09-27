import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setErrorMsg('Please enter a valid email or User ID.');
      return;
    }
    login(userId.trim());
    navigate('/');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg p-4">
            <div className="text-center mb-4">
              <div
                className="brand-icon-wrapper d-inline-flex align-items-center justify-content-center position-relative mb-2"
                style={{
                  width: '52px',
                  height: '52px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 16px -4px rgba(16, 185, 129, 0.4)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.12 2 7 0 6-5.5 11-10 11z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                </svg>
              </div>
              <h3 className="fw-bold text-body">
                   <span className="fw-black fs-4 text-body-emphasis lh-1 tracking-tight" style={{ fontWeight: 800, letterSpacing: '-0.6px', fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
                  Fresh<span className="text-accent" style={{ color: '#10b981' }}>Find</span>
                </span>
              </h3>
              <p className="text-muted small">Farmer & Community Registration</p>
            </div>

            <form id="loginForm" onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-accent">Email or User ID</label>
                <input
                  type="text"
                  id="loginUserId"
                  className="form-control"
                  required
                  placeholder="Enter your ID or Email"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-accent">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  className="form-control"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label small text-muted" htmlFor="rememberMe">Remember Me</label>
              </div>
              <button type="submit" className="btn btn-accent w-100 fw-semibold mb-3">Sign In</button>
              {errorMsg && (
                <div id="loginAlert" className="alert alert-danger small p-2">
                  {errorMsg}
                </div>
              )}
            </form>

            <div className="text-center mt-3 pt-3 border-top small text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent fw-bold text-decoration-none">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}