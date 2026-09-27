import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <footer className="bg-body-tertiary pt-5 pb-3 border-top mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand & Tagline */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                className="brand-icon-wrapper d-flex align-items-center justify-content-center position-relative"
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '14px',
                  boxShadow: '0 8px 16px -4px rgba(16, 185, 129, 0.4)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.12 2 7 0 6-5.5 11-10 11z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                </svg>
              </div>
              <div className="d-flex flex-column">
                <span className="fw-black fs-4 text-body-emphasis lh-1 tracking-tight" style={{ fontWeight: 800, letterSpacing: '-0.6px', fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
                  Fresh<span className="text-accent" style={{ color: '#10b981' }}>Find</span>
                </span>
                <span className="brand-tagline text-uppercase" style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1.5px', color: '#10b981', marginTop: '3px' }}>
                  Fresh All Along
                </span>
              </div>
            </div>
            <p className="text-body-secondary small">
              Connecting local communities directly with local farmers. Simple, natural, and fresh produce discovery for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-6">
            <h6 className="text-uppercase fw-bold mb-3 text-accent" style={{ color: '#10b981' }}>Quick Links</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                {isAuthPage ? (
                  <span className="text-body-secondary" style={{ cursor: 'not-allowed', opacity: 0.7 }}>Home</span>
                ) : (
                  <Link to="/" className="text-body-secondary text-decoration-none">Home</Link>
                )}
              </li>
              <li className="mb-2">
                {isAuthPage ? (
                  <span className="text-body-secondary" style={{ cursor: 'not-allowed', opacity: 0.7 }}>Find a Market</span>
                ) : (
                  <Link to="/markets" className="text-body-secondary text-decoration-none">Find a Market</Link>
                )}
              </li>
              <li className="mb-2">
                {isAuthPage ? (
                  <span className="text-body-secondary" style={{ cursor: 'not-allowed', opacity: 0.7 }}>Market Directory</span>
                ) : (
                  <Link to="/markets" className="text-body-secondary text-decoration-none">Market Directory</Link>
                )}
              </li>
              <li className="mb-2">
                {isAuthPage ? (
                  <span className="text-body-secondary" style={{ cursor: 'not-allowed', opacity: 0.7 }}>Produce Guide</span>
                ) : (
                  <Link to="/produce" className="text-body-secondary text-decoration-none">Produce Guide</Link>
                )}
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-lg-2 col-6">
            <h6 className="text-uppercase fw-bold mb-3 text-accent" style={{ color: '#10b981' }}>Company</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                {isAuthPage ? (
                  <span className="text-body-secondary" style={{ cursor: 'not-allowed', opacity: 0.7 }}>About Us</span>
                ) : (
                  <Link to="/about" className="text-body-secondary text-decoration-none">About Us</Link>
                )}
              </li>
              <li className="mb-2">
                {isAuthPage ? (
                  <span className="text-body-secondary" style={{ cursor: 'not-allowed', opacity: 0.7 }}>Contact Us</span>
                ) : (
                  <Link to="/contact" className="text-body-secondary text-decoration-none">Contact Us</Link>
                )}
              </li>
              <li className="mb-2">
                {isAuthPage ? (
                  <span className="text-body-secondary" style={{ cursor: 'not-allowed', opacity: 0.7 }}>Farmer Login</span>
                ) : (
                  <Link to="/login" className="text-body-secondary text-decoration-none">Farmer Login</Link>
                )}
              </li>
              <li className="mb-2">
                {isAuthPage ? (
                  <span className="text-body-secondary" style={{ cursor: 'not-allowed', opacity: 0.7 }}>Register</span>
                ) : (
                  <Link to="/signup" className="text-body-secondary text-decoration-none">Register</Link>
                )}
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="col-lg-4">
            <h6 className="text-uppercase fw-bold mb-3 text-accent" style={{ color: '#10b981' }}>Stay Connected</h6>
            <p className="text-body-secondary small mb-3">Support your neighborhood local farmers and eat healthy, fresh food every day.</p>
            <div className="d-flex gap-3 align-items-center" style={isAuthPage ? { pointerEvents: 'none', opacity: 0.6 } : {}}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="fs-5 text-accent" style={{ color: '#10b981' }}><i className="bi bi-facebook"></i></a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="fs-5 text-accent" style={{ color: '#10b981' }}><i className="bi bi-whatsapp"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="fs-5 text-accent" style={{ color: '#10b981' }}><i className="bi bi-twitter-x"></i></a>
              <a href="mailto:support@freshfind.local" className="fs-5 text-accent" style={{ color: '#10b981' }}><i className="bi bi-envelope-fill"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="fs-5 text-accent" style={{ color: '#10b981' }}><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
        <hr className="border" />
        <div className="text-center text-body-secondary small">
          © 2026 FreshFind — Fresh All Along. All rights reserved.
        </div>
      </div>
    </footer>
  );
}