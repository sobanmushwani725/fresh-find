import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp, isMarketOpenNow } from '../context/AppContext';
import MarketCard from '../components/MarketCard';
import ProduceCard from '../components/ProduceCard';

export default function HomePage() {
  const { markets, produce } = useApp();
  const navigate = useNavigate();

  const [quickArea, setQuickArea] = useState('');
  const [quickDay, setQuickDay] = useState('');
  const [quickProduct, setQuickProduct] = useState('');

  const handleQuickFind = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quickArea) params.append('area', quickArea);
    if (quickDay) params.append('day', quickDay);
    if (quickProduct) params.append('produce', quickProduct);

    navigate(`/markets?${params.toString()}`);
  };

  const openMarkets = markets.filter(m => isMarketOpenNow(m.hours));
  const featuredMarkets = markets.slice(0, 3);
  const seasonalPicks = produce.slice(0, 4);

  return (
    <>
      {/* HERO SECTION */}
      <section className="py-5 bg-theme-dark border-bottom border position-relative overflow-hidden">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-accent-subtle text-accent fw-bold small mb-3">
                <i className="bi bi-patch-check-fill"></i> Verified Local Farms
              </div>
              <h1 className="display-3 fw-bold text-body-emphasis lh-sm mb-3" style={{ letterSpacing: '-1.5px' }}>
                Eat Fresh. <br />
                <span className="text-accent" style={{ color: '#00a86b' }}>Support Local.</span>
              </h1>
              <p className="lead mb-4 text-body-secondary">
                FreshFind connects you directly with neighborhood growers. Discover peak-season produce, artisan honeys, and weekly farmer markets.
              </p>
              <div className="d-flex align-items-center gap-3 mb-4">
                <Link
                  to="/markets"
                  className="btn btn-accent btn-lg px-4 py-3 fw-bold rounded-4 shadow-sm text-white"
                  style={{ backgroundColor: '#00a86b', borderColor: '#00a86b' }}
                >
                  <i className="bi bi-compass-fill me-2"></i>Explore Markets
                </Link>
                <Link
                  to="/about"
                  className="btn btn-outline-accent btn-lg px-4 py-3 fw-semibold rounded-4"
                  style={{ color: '#00a86b', borderColor: '#00a86b' }}
                >
                  Our Mission
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="row mt-4 pt-3 pb-3 px-2 rounded-4 border-top border-success border-opacity-25 bg-success bg-opacity-10 g-3 align-items-center">
                <div className="col-4 text-center border-end border-success border-opacity-25">
                  <h3 className="fw-bold mb-0" style={{ color: '#00a86b' }}>50+</h3>
                  <small className="text-body-secondary fw-medium">Active Markets</small>
                </div>
                <div className="col-4 text-center border-end border-success border-opacity-25">
                  <h3 className="fw-bold mb-0" style={{ color: '#00a86b' }}>100%</h3>
                  <small className="text-body-secondary fw-medium">Farm Direct</small>
                </div>
                <div className="col-4 text-center">
                  <h3 className="fw-bold mb-0" style={{ color: '#00a86b' }}>Daily</h3>
                  <small className="text-body-secondary fw-medium">Fresh Picks</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="position-relative">
                {/* HERO IMAGE */}
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
                  alt="Fresh Produce Market"
                  className="w-100 rounded-5 shadow-lg object-fit-cover"
                  style={{ height: '480px' }}
                />

                {/* Floating Badge */}
                <div
                  className="position-absolute bottom-0 start-0 m-4 p-3 rounded-4 shadow-lg border border-success border-opacity-50 d-flex align-items-center gap-3"
                  style={{ maxWidth: '280px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', zIndex: 2 }}
                >
                  <div
                    className="rounded-circle p-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 168, 107, 0.2)' }}
                  >
                    <i className="bi bi-basket fs-4" style={{ color: '#00a86b' }}></i>
                  </div>
                  <div>
                    <p className="mb-0 fw-bold small text-white" style={{ color: '#00a86b' }}>100% Seasonal</p>
                    <small className="text-white-50" style={{ fontSize: '0.75rem' }}>Picked fresh from local fields today.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FIND SECTION */}
      <section className="py-5 bg-theme-darker">
        <div className="container">
          <div className="card shadow-lg border-0 bg-theme-dark p-4">
            <h3 className="fw-bold text-accent text-center mb-4">
              <i className="bi bi-search me-2"></i>Find a Market Near You
            </h3>
            <form className="row g-3" onSubmit={handleQuickFind}>
              <div className="col-md-3">
                <label className="form-label fw-semibold text-accent">Area</label>
                <select
                  id="quickArea"
                  className="form-select"
                  value={quickArea}
                  onChange={(e) => setQuickArea(e.target.value)}
                >
                  <option value="">All Areas</option>
                  <option value="DHA">DHA</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Clifton">Clifton</option>
                  <option value="North Nazimabad">North Nazimabad</option>
                  <option value="Saddar">Saddar</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold text-accent">Day</label>
                <select
                  id="quickDay"
                  className="form-select"
                  value={quickDay}
                  onChange={(e) => setQuickDay(e.target.value)}
                >
                  <option value="">Any Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold text-accent">Product</label>
                <select
                  id="quickProduct"
                  className="form-select"
                  value={quickProduct}
                  onChange={(e) => setQuickProduct(e.target.value)}
                >
                  <option value="">All Produce</option>
                  <option value="Tomatoes">Tomatoes</option>
                  <option value="Apples">Apples</option>
                  <option value="Carrots">Carrots</option>
                  <option value="Spinach">Spinach</option>
                  <option value="Honey">Organic Honey</option>
                  <option value="Eggs">Farm Eggs</option>
                </select>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button type="submit" className="btn btn-accent w-100 fw-semibold">
                  <i className="bi bi-funnel me-1"></i>Find Market
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* MARKETS OPEN NOW & FEATURED */}
      <section className="py-5 bg-theme-dark">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-accent mb-1">Markets Open Now</h2>
              <p className="text-muted mb-0">Discover farmers' markets serving fresh goods right now</p>
            </div>
            <Link to="/markets" className="btn btn-outline-accent">
              View All Directory
            </Link>
          </div>

          <div className="row g-4" id="openNowMarketsContainer">
            {openMarkets.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info border-0 shadow-sm text-center">
                  <i className="bi bi-clock-history me-2"></i> No markets are open at this exact hour. Check back during standard morning/afternoon hours!
                </div>
              </div>
            ) : (
              openMarkets.map(m => <MarketCard key={m.id} market={m} />)
            )}
          </div>

          <div className="mt-5">
            <h2 className="fw-bold text-accent mb-3">Featured Farmers’ Markets</h2>
            <div className="row g-4" id="featuredMarketsContainer">
              {featuredMarkets.map(m => <MarketCard key={m.id} market={m} />)}
            </div>
          </div>
        </div>
      </section>

      {/* THIS WEEK'S FRESH PICKS */}
      <section className="py-5 bg-theme-darker">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-accent mb-1">This Week’s Fresh Picks</h2>
              <p className="text-muted mb-0">Seasonal fruits, vegetables, and local farm produce in season today</p>
            </div>
            <Link to="/produce" className="btn btn-outline-accent">
              Explore Produce Guide
            </Link>
          </div>
          <div className="row g-4" id="seasonalPicksContainer">
            {seasonalPicks.map(p => (
              <ProduceCard key={p.id} item={p} colClass="col-md-3 col-sm-6" compact={true} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}