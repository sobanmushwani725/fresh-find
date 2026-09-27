import React from 'react';
import { Link } from 'react-router-dom';
import { useApp, isMarketOpenNow } from '../context/AppContext';

export default function MarketCard({ market, colClass = 'col-md-4' }) {
  const { toggleBookmark, isBookmarked } = useApp();
  const isOpen = isMarketOpenNow(market.hours);
  const badgeClass = isOpen ? 'bg-success' : 'bg-secondary';
  const badgeText = isOpen ? 'OPEN NOW' : 'CLOSED';
  const bookmarked = isBookmarked('market', market.id);

  return (
    <div className={colClass}>
      <div className="card h-100 bg-body-tertiary border shadow-sm hover-card overflow-hidden">
        <div className="position-relative">
          <img
            src={market.image}
            className="card-img-top"
            style={{ height: '180px', objectFit: 'cover' }}
            alt={`Photo of ${market.name}`}
          />
          <span className={`badge ${badgeClass} position-absolute top-0 end-0 m-2 px-2 py-1`}>
            {badgeText}
          </span>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="fw-bold mb-1 text-body">{market.name}</h5>
          <p className="text-success small mb-2">
            <i className="bi bi-geo-alt-fill text-success me-1" aria-hidden="true"></i>
            {market.area} • {market.address}
          </p>
          <p className="small text-body-secondary flex-grow-1">
            {market.description.length > 90
              ? `${market.description.substring(0, 90)}...`
              : market.description}
          </p>
          <div className="mb-3 small text-body-secondary">
            <strong className="text-body">Days:</strong> {market.days.join(', ')}
            <br />
            <strong className="text-body">Hours:</strong> {market.hours.open} - {market.hours.close}
          </div>
          <div className="d-flex gap-2">
            <Link
              to={`/market-details/${market.id}`}
              className="btn btn-sm btn-accent flex-grow-1"
              aria-label={`View details for ${market.name}`}
            >
              View Details
            </Link>
            <button
              onClick={() => toggleBookmark('market', market.id, market.name)}
              className={`btn btn-sm ${bookmarked ? 'btn-accent text-white' : 'btn-outline-accent'}`}
              aria-label={`Bookmark ${market.name}`}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark this market'}
            >
              <i className={`bi ${bookmarked ? 'bi-bookmark-heart-fill' : 'bi-bookmark-heart'}`} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}