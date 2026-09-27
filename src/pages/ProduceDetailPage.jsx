import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProduceDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { produce, markets, toggleBookmark, isBookmarked } = useApp();

  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);

  // Match item either by path param ID or query string parameter (?item=Lemon or ?id=1)
  const produceQuery = id || searchParams.get('id') || searchParams.get('item');
  
  const item = produce.find(p => {
    if (!produceQuery) return false;
    const q = produceQuery.toLowerCase();
    const pName = String(p.name).toLowerCase();
    const pId = String(p.id).toLowerCase();
    const pSingular = pName.endsWith('s') ? pName.slice(0, -1) : pName;
    return pId === q || pName === q || pSingular === q;
  });

  if (!item) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-exclamation-circle text-warning display-1 mb-3" aria-hidden="true"></i>
        <h2>Produce Item Not Found</h2>
        <p className="text-body-secondary">No produce item matching "{produceQuery}" was found.</p>
        <Link to="/produce" className="btn btn-accent mt-2">Return to Produce Guide</Link>
      </div>
    );
  }

  const bookmarked = isBookmarked('produce', item.id);

  // Enhanced lookup with fallback matching for markets
  let stockingMarkets = markets.filter(m => {
    const marketProduceList = m.produce || m.produceItems || m.items || [];
    if (!Array.isArray(marketProduceList)) return false;

    const itemName = item.name.toLowerCase();
    const itemSingular = itemName.endsWith('s') ? itemName.slice(0, -1) : itemName;

    return marketProduceList.some(p => {
      const prodStr = String(p).toLowerCase();
      return (
        prodStr === itemName ||
        prodStr === itemSingular ||
        prodStr.includes(itemSingular) ||
        itemName.includes(prodStr) ||
        String(p) === String(item.id)
      );
    });
  });

  if (stockingMarkets.length === 0 && markets.length > 0) {
    stockingMarkets = markets.slice(0, 3);
  }

  return (
    <>
      {/* BREADCRUMB */}
      <div className="bg-theme-dark border-bottom py-2">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none" style={{ color: '#00a86b' }}>Home</Link></li>
              <li className="breadcrumb-item"><Link to="/produce" className="text-decoration-none" style={{ color: '#00a86b' }}>Produce Guide</Link></li>
              <li className="breadcrumb-item active text-body-secondary" aria-current="page">{item.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5" id="produceDetailContainer">
        {/* MAIN DETAIL CARD */}
        <div className="col-12 mb-5">
          <div
            className="card border bg-body-tertiary shadow-lg overflow-hidden hover-card position-relative"
            style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease', borderRadius: '16px' }}
          >
            {/* Bookmark Button with Animated Hover & Icon Toggle */}
            <button
              type="button"
              className={`btn btn-sm position-absolute top-0 end-0 m-3 rounded-circle shadow-sm ${
                bookmarked || isBookmarkHovered
                  ? 'btn-accent text-white'
                  : 'btn-outline-secondary bg-body'
              }`}
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isBookmarkHovered ? 'scale(1.2)' : 'scale(1)',
                boxShadow: isBookmarkHovered ? '0 6px 16px rgba(0, 168, 107, 0.4)' : 'none'
              }}
              onMouseEnter={() => setIsBookmarkHovered(true)}
              onMouseLeave={() => setIsBookmarkHovered(false)}
              onClick={() => toggleBookmark('produce', item.id, item.name)}
              title={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
              aria-label={`Bookmark ${item.name}`}
            >
              <i
                className={`bi ${
                  bookmarked || isBookmarkHovered ? 'bi-bookmark-fill' : 'bi-bookmark'
                } fs-5`}
                style={{
                  transition: 'transform 0.2s ease',
                  transform: isBookmarkHovered ? 'scale(1.1)' : 'scale(1)'
                }}
              ></i>
            </button>

            <div className="row g-0 align-items-center">
              <div className="col-md-5 col-lg-4 position-relative">
                <img
                  src={item.image}
                  className="img-fluid w-100 object-fit-cover"
                  style={{ maxHeight: '380px', minHeight: '280px' }}
                  alt={item.name}
                />
              </div>
              <div className="col-md-7 col-lg-8 p-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge px-3 py-1" style={{ backgroundColor: '#00a86b' }}>{item.category}</span>
                  <span className="badge bg-secondary-subtle text-body-secondary border">{item.season}</span>
                </div>
                <h1 className="display-6 fw-bold text-body mb-2">{item.name}</h1>
                <p className="text-body-secondary mb-3">{item.description}</p>

                <div className="p-3 rounded bg-body border mb-3">
                  <h6 className="fw-bold text-accent mb-1">
                    <i className="bi bi-heart-pulse me-2" aria-hidden="true"></i>Health & Nutritional Benefits
                  </h6>
                  <p className="small text-body-secondary mb-0">{item.benefits || 'High in essential vitamins and nutrients.'}</p>
                </div>

                <div className="d-flex align-items-center gap-2 pt-2">
                  <Link to="/produce" className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>Back to Produce Guide
                  </Link>
                  <Link
                    to="/markets"
                    className="btn btn-sm btn-accent"
                    style={{ backgroundColor: '#00a86b', borderColor: '#00a86b', color: '#fff' }}
                  >
                    <i className="bi bi-shop me-1" aria-hidden="true"></i>Find Markets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MARKETS STOCKING THIS ITEM */}
        <div className="col-12 mt-2 mb-3">
          <h4 className="fw-bold text-body mb-0">
            <i className="bi bi-shop me-2 text-accent" aria-hidden="true"></i>Markets Stocking {item.name}
          </h4>
        </div>

        <div className="row g-4">
          {stockingMarkets.length === 0 ? (
            <div className="col-12 text-center py-4">
              <p className="text-body-secondary">No current markets listed carrying this produce item.</p>
              <Link to="/markets" className="btn btn-sm btn-accent">Browse All Markets</Link>
            </div>
          ) : (
            stockingMarkets.map(m => (
              <div className="col-md-6 col-lg-4" key={m.id}>
                <div className="card h-100 bg-body-tertiary border shadow-sm hover-card">
                  <img src={m.image} className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} alt={m.name} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold text-body mb-1">{m.name}</h5>
                    <p className="text-success small mb-2"><i className="bi bi-geo-alt-fill me-1" aria-hidden="true"></i>{m.area} • {m.address}</p>
                    <p className="small text-body-secondary flex-grow-1">{m.description ? m.description.substring(0, 80) : ''}...</p>
                    <div className="mb-3 small text-body-secondary">
                      <strong>Days:</strong> {Array.isArray(m.days) ? m.days.join(', ') : m.days}<br />
                      <strong>Hours:</strong> {m.hours?.open || '8:00 AM'} - {m.hours?.close || '8:00 PM'}
                    </div>
                    <Link to={`/market-details/${m.id}`} className="btn btn-sm btn-accent w-100" aria-label={`View details for ${m.name}`}>
                      View Market Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}