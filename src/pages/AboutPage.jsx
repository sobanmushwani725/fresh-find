import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <>
      {/* BREADCRUMB */}
      <div className="bg-theme-dark border-bottom py-2">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none" style={{ color: '#10b981' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active text-body-secondary" aria-current="page">About Us</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        {/* HERO ABOUT */}
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="badge px-3 py-2 rounded-pill fw-semibold mb-2" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            Our Story & Mission
          </span>
          <h1 className="fw-bold display-5 mb-3" style={{ color: '#10b981' }}>Rooted in Community, Growing Local Trust</h1>
          <p className="lead text-body-secondary">
            FreshFind was created to make local farmers' markets accessible to every household. We bridge the gap between hard-working farmers and health-conscious families.
          </p>
        </div>

        {/* 3 COLUMNS */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border shadow-sm h-100 p-4 text-center bg-body-tertiary hover-card">
              <div className="icon-circle mx-auto mb-3">
                <i className="bi bi-tree fs-3" style={{ color: '#10b981' }}></i>
              </div>
              <h5 className="fw-bold" style={{ color: '#10b981' }}>Support Local Farmers</h5>
              <p className="text-body-secondary small mb-0">
                Empowering regional growers and organic producers by connecting them directly with consumers without corporate middlemen.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border shadow-sm h-100 p-4 text-center bg-body-tertiary hover-card">
              <div className="icon-circle mx-auto mb-3">
                <i className="bi bi-heart-pulse fs-3" style={{ color: '#10b981' }}></i>
              </div>
              <h5 className="fw-bold" style={{ color: '#10b981' }}>Fresh & Seasonal</h5>
              <p className="text-body-secondary small mb-0">
                Promoting seasonal eating for better health, superior flavor, and environmental sustainability in our neighborhoods.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border shadow-sm h-100 p-4 text-center bg-body-tertiary hover-card">
              <div className="icon-circle mx-auto mb-3">
                <i className="bi bi-geo-alt fs-3" style={{ color: '#10b981' }}></i>
              </div>
              <h5 className="fw-bold" style={{ color: '#10b981' }}>Simple Market Discovery</h5>
              <p className="text-body-secondary small mb-0">
                Helping families effortlessly find market schedules, active open hours, location directions, and available harvest picks.
              </p>
            </div>
          </div>
        </div>

        {/* TEAM SECTION */}
        <div className="mt-5">
          <h2 className="fw-bold text-center mb-4" style={{ color: '#10b981' }}>Meet Our Community Team</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border shadow-sm text-center p-3 bg-body-tertiary hover-card">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp9LtzWaFUtuONmREcjFI1SLQvOr9CQUtdWO_wBB-wow&s"
                  className="rounded-circle mx-auto mb-3 border"
                  style={{ width: '110px', height: '110px', objectFit: 'cover' }}
                  alt="Soban Khan"
                />
                <h5 className="fw-bold mb-1 text-body">Soban Khan</h5>
                <p className="small fw-semibold" style={{ color: '#10b981' }}>Community Director</p>
                <p className="text-body-secondary small mb-0">Passionate advocate for sustainable farming and local community markets.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border shadow-sm text-center p-3 bg-body-tertiary hover-card">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsOEiPAIeT3OE5HA8ml9so9yAZXHPAXfA-6KhJsNNzs9KT-E5N0rED5W4o&s=10"
                  className="rounded-circle mx-auto mb-3 border"
                  style={{ width: '110px', height: '110px', objectFit: 'cover' }}
                  alt="Hairbayer Nazir"
                />
                <h5 className="fw-bold mb-1 text-body">Hairbayer Nazir</h5>
                <p className="small fw-semibold" style={{ color: '#10b981' }}>Agricultural Liaison</p>
                <p className="text-body-secondary small mb-0">Works side-by-side with regional farmers and stall vendors across Karachi.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border shadow-sm text-center p-3 bg-body-tertiary hover-card">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKnbRLCbRNcQKo9JTgGzcc3D0dHfGiq5A7APNU8y7bZA&s=10"
                  className="rounded-circle mx-auto mb-3 border"
                  style={{ width: '110px', height: '110px', objectFit: 'cover' }}
                  alt="Fredrinn"
                />
                <h5 className="fw-bold mb-1 text-body">Fredrinn</h5>
                <p className="small fw-semibold" style={{ color: '#10b981' }}>Product Lead</p>
                <p className="text-body-secondary small mb-0">Ensures our web platform remains simple, accessible, and friendly for all users.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}