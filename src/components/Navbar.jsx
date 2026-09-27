import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { theme, toggleTheme, loggedUser, logout, totalBookmarkCount } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [navCollapsed, setNavCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/markets?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-theme-dark shadow border-bottom py-2">
      <div className="container">
        {/* Brand Logo - Disabled (non-clickable) on Auth Pages */}
        {isAuthPage ? (
          <div className="navbar-brand d-flex align-items-center gap-2 text-decoration-none me-auto" style={{ cursor: 'default' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                minWidth: '38px',
                minHeight: '38px',
                maxWidth: '38px',
                maxHeight: '38px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '12px',
                boxShadow: '0 6px 12px -3px rgba(16, 185, 129, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.12 2 7 0 6-5.5 11-10 11z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </div>
            <div className="d-flex flex-column">
              <span className="fw-black fs-5 text-dark lh-1 tracking-tight" style={{ fontWeight: 800, letterSpacing: '-0.6px', fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
                Fresh<span className="text-accent">Find</span>
              </span>
              <span className="brand-tagline text-uppercase" style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '1.2px', color: '#10b981', marginTop: '2px' }}>
                Fresh All Along
              </span>
            </div>
          </div>
        ) : (
          <Link className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" to="/">
            <div
              style={{
                width: '38px',
                height: '38px',
                minWidth: '38px',
                minHeight: '38px',
                maxWidth: '38px',
                maxHeight: '38px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '12px',
                boxShadow: '0 6px 12px -3px rgba(16, 185, 129, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.12 2 7 0 6-5.5 11-10 11z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </div>
            <div className="d-flex flex-column">
              <span className="fw-black fs-5 text-dark lh-1 tracking-tight" style={{ fontWeight: 800, letterSpacing: '-0.6px', fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
                Fresh<span className="text-accent">Find</span>
              </span>
              <span className="brand-tagline text-uppercase" style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '1.2px', color: '#10b981', marginTop: '2px' }}>
                Fresh All Along
              </span>
            </div>
          </Link>
        )}

        {/* Mobile menu toggler */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          {!isAuthPage && (
            <button
              className="navbar-toggler border-0 shadow-none text-accent px-1"
              type="button"
              onClick={() => setNavCollapsed(!navCollapsed)}
              aria-label="Toggle navigation"
            >
              <i className={`bi ${navCollapsed ? 'bi-list' : 'bi-x-lg'} fs-3`}></i>
            </button>
          )}
        </div>

        <div className={`collapse navbar-collapse ${navCollapsed ? '' : 'show'}`} id="freshNavbar">
          {/* Navigation Links (Hidden on Auth Pages) */}
          {!isAuthPage && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-2 align-items-lg-center">
              <li className="nav-item pe-lg-2 me-lg-1 border-end border-secondary border-opacity-25 d-none d-lg-block"></li>
              <li className="nav-item">
                <NavLink to="/" end className={({ isActive }) => `nav-link px-2 ${isActive ? 'active fw-bold text-accent' : 'text-body'}`}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item px-lg-1 text-secondary opacity-50 d-none d-lg-block">|</li>
              <li className="nav-item">
                <NavLink to="/markets" className={({ isActive }) => `nav-link px-2 ${isActive ? 'active fw-bold text-accent' : 'text-body'}`}>
                  Find a Market
                </NavLink>
              </li>
              <li className="nav-item px-lg-1 text-secondary opacity-50 d-none d-lg-block">|</li>
              <li className="nav-item">
                <NavLink to="/produce" className={({ isActive }) => `nav-link px-2 ${isActive ? 'active fw-bold text-accent' : 'text-body'}`}>
                  Produce Guide
                </NavLink>
              </li>
              <li className="nav-item px-lg-1 text-secondary opacity-50 d-none d-lg-block">|</li>
              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => `nav-link px-2 ${isActive ? 'active fw-bold text-accent' : 'text-body'}`}>
                  About Us
                </NavLink>
              </li>
              <li className="nav-item px-lg-1 text-secondary opacity-50 d-none d-lg-block">|</li>
              <li className="nav-item">
                <NavLink to="/contact" className={({ isActive }) => `nav-link px-2 ${isActive ? 'active fw-bold text-accent' : 'text-body'}`}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          )}

          <div className={`d-flex align-items-center flex-wrap gap-2 ms-lg-auto my-2 my-lg-0 ${isAuthPage ? 'ms-auto' : ''}`}>
            {/* Global Search - Hidden on Auth Pages */}
            {!isAuthPage && (
              <form className="d-flex" onSubmit={handleGlobalSearch} style={{ maxWidth: '200px' }}>
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    id="globalSearchInput"
                    className="form-control bg-body text-body border-secondary"
                    placeholder="Search..."
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-accent btn-sm d-flex align-items-center justify-content-center px-2" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            )}

            {/* Saved Bookmarks Link - Hidden on Auth Pages */}
            {!isAuthPage && (
              <Link to="/bookmarks" className="btn btn-outline-accent btn-sm position-relative d-inline-flex align-items-center gap-1 text-nowrap">
                <i className="bi bi-bookmark-heart-fill"></i> Saved
                <span id="navBookmarkCount" className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-accent text-white" style={{ fontSize: '0.6rem', padding: '0.3em 0.45em' }}>
                  {totalBookmarkCount}
                </span>
              </Link>
            )}

            {/* User Greeting & Login/Logout */}
            {loggedUser ? (
              <>
                <span id="userGreeting" className="small fw-semibold text-accent text-nowrap">
                  Hi, {loggedUser}
                </span>
                <button onClick={logout} className="btn btn-accent btn-sm fw-semibold">
                  Logout
                </button>
              </>
            ) : (
              !isAuthPage && (
                <Link id="navAuthBtn" to="/login" className="btn btn-accent btn-sm fw-semibold text-nowrap">
                  Login
                </Link>
              )
            )}

            {/* Single Theme Toggle Button */}
            <button
              id="themeToggleBtn"
              onClick={toggleTheme}
              className="btn btn-outline-accent btn-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '34px', height: '34px', minWidth: '34px', padding: 0 }}
              type="button"
              aria-label="Toggle theme"
            >
              <i id="themeIcon" className={theme === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill'}></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}