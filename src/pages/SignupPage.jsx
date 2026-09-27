import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SignupPage() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    userId: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validated, setValidated] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, text: '', type: 'danger' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setValidated(true);

    const { fullName, userId, address, phone, email, password, confirmPassword } = formData;

    if (!fullName || !userId || !address || !phone || !email || !password || !confirmPassword) {
      setAlertInfo({
        show: true,
        text: 'Please correctly fill out all required fields.',
        type: 'danger'
      });
      return;
    }

    if (password.length < 6) {
      setAlertInfo({
        show: true,
        text: 'Password must be at least 6 characters.',
        type: 'danger'
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlertInfo({
        show: true,
        text: 'Passwords do not match.',
        type: 'danger'
      });
      return;
    }

    login(fullName);
    setAlertInfo({
      show: true,
      text: 'Registration successful! Redirecting...',
      type: 'success'
    });

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
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
              <h3 className="fw-bold text-accent">     <span className="fw-black fs-4 text-body-emphasis lh-1 tracking-tight" style={{ fontWeight: 800, letterSpacing: '-0.6px', fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
                  Fresh<span className="text-accent" style={{ color: '#10b981' }}>Find</span>
                </span></h3>
              <p className="text-muted small">Farmer & Community Registration</p>
            </div>

            <form id="signupForm" className={validated ? 'was-validated' : ''} onSubmit={handleSignup} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-accent">Full Name *</label>
                  <input
                    type="text"
                    id="regFullName"
                    name="fullName"
                    className="form-control"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Full name is required.</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-accent">Desired User ID *</label>
                  <input
                    type="text"
                    id="regUserId"
                    name="userId"
                    className="form-control"
                    required
                    placeholder="e.g. farmer_ali"
                    value={formData.userId}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Unique User ID required.</div>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold text-accent">Address *</label>
                  <input
                    type="text"
                    id="regAddress"
                    name="address"
                    className="form-control"
                    required
                    placeholder="Area / Street Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Address is required.</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-accent">Phone Number *</label>
                  <input
                    type="tel"
                    id="regPhone"
                    name="phone"
                    className="form-control"
                    required
                    placeholder="03*********"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Valid phone number required.</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-accent">Email *</label>
                  <input
                    type="email"
                    id="regEmail"
                    name="email"
                    className="form-control"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Valid email required.</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-accent">Password *</label>
                  <input
                    type="password"
                    id="regPassword"
                    name="password"
                    className="form-control"
                    minLength={6}
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Password must be at least 6 characters.</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-accent">Confirm Password *</label>
                  <input
                    type="password"
                    id="regConfirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Passwords do not match.</div>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-accent w-100 fw-semibold">
                    Create Account
                  </button>
                </div>
              </div>

              {alertInfo.show && (
                <div id="signupAlert" className={`alert alert-${alertInfo.type} mt-3 small p-2`}>
                  {alertInfo.text}
                </div>
              )}
            </form>

            <div className="text-center mt-3 pt-3 border-top small text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-accent fw-bold text-decoration-none">
                Sign In Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
