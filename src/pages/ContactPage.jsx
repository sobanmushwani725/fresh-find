import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [geoStatus, setGeoStatus] = useState('Locating your current position...');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Feedback',
    message: ''
  });

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('Geolocation is not supported by your browser.');
      return;
    }

    setGeoStatus('Detecting location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoStatus(
          `Detected Location: ${pos.coords.latitude.toFixed(3)}° N, ${pos.coords.longitude.toFixed(3)}° E`
        );
      },
      () => {
        setGeoStatus('Location permission denied. Showing default Karachi hub.');
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: 'General Feedback',
      message: ''
    });
  };

  return (
    <>
      {/* BREADCRUMB */}
      <div className="bg-theme-dark border-bottom py-2">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-accent text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item active text-muted" aria-current="page">Contact Us</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card shadow-sm p-4 h-100 hover-card">
              <h3 className="fw-bold text-accent mb-3">Get in Touch</h3>
              <p className="text-muted small mb-4">
                Are you a local farmer wishing to list your stall, or a visitor with questions? Reach out to us anytime!
              </p>

              <div className="d-flex align-items-start mb-3">
                <i className="bi bi-geo-alt-fill text-accent fs-4 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-0">Office Address</h6>
                  <p className="text-muted small mb-0">Main Boulevard, DHA Phase 5, Karachi, Pakistan</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <i className="bi bi-envelope-fill text-accent fs-4 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-0">Email Us</h6>
                  <p className="text-muted small mb-0">support@freshfind.local</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <i className="bi bi-telephone-fill text-accent fs-4 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-0">Phone Support</h6>
                  <p className="text-muted small mb-0">+92 (21) 111-373-743</p>
                </div>
              </div>

              <div id="contactGeoBox" className="p-3 bg-theme-dark rounded border">
                <h6 className="fw-bold small mb-1 text-accent">
                  <i className="bi bi-compass me-1"></i> Your Geolocation Status
                </h6>
                <p id="geoStatusText" className="small text-muted mb-2">{geoStatus}</p>
                <button
                  type="button"
                  onClick={requestUserLocation}
                  className="btn btn-outline-accent btn-sm"
                >
                  <i className="bi bi-crosshair me-1"></i> Detect My Location
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card shadow-sm p-4 hover-card">
              <h4 className="fw-bold text-accent mb-3">Send Us a Message</h4>
              {submitted && (
                <div id="contactSuccessAlert" className="alert alert-success small mb-3">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Thank you! Your message has been sent successfully. We'll be in touch shortly.
                </div>
              )}
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-accent">Your Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-accent">Your Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-accent">Subject</label>
                    <select
                      className="form-select"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="General Feedback">General Feedback</option>
                      <option value="Stall Listing Inquiry">Stall Listing Inquiry</option>
                      <option value="Market Schedule Update">Market Schedule Update</option>
                      <option value="Produce Partnership">Produce Partnership</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-accent">Message *</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      required
                      placeholder="Write your message or question here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-accent w-100 fw-semibold">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* GOOGLE MAP SECTION */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card shadow-sm p-3 hover-card">
              <h5 className="fw-bold text-accent mb-3">
                <i className="bi bi-map-fill me-2"></i> Our Location Map
              </h5>
              <div className="ratio ratio-21x9 rounded overflow-hidden border">
                <iframe
                  title="FreshFind Location Map"
                  src="https://maps.google.com/maps?q=Main%20Boulevard,%20DHA%20Phase%205,%20Karachi,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}