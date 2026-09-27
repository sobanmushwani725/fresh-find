import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProduceCard({ item, colClass = 'col-md-6 col-lg-4', compact = false }) {
  const { toggleBookmark, isBookmarked, markets } = useApp();
  const bookmarked = isBookmarked('produce', item.id);

  const marketCount = markets.filter(m =>
    m.produce.some(p => p.toLowerCase() === item.name.toLowerCase())
  ).length;

  if (compact) {
    return (
      <div className={colClass}>
        <div className="card h-100 bg-body-tertiary border shadow-sm hover-card">
          <img
            src={item.image}
            className="card-img-top"
            style={{ height: '160px', objectFit: 'cover' }}
            alt={item.name}
          />
          <div className="card-body d-flex flex-column">
            <span className="badge bg-success-subtle text-success border border-success w-auto align-self-start mb-2">
              {item.category}
            </span>
            <h6 className="fw-bold mb-1 text-body">{item.name}</h6>
            <p className="small text-success mb-2">
              <i className="bi bi-sun me-1"></i>
              {item.season}
            </p>
            <p className="small text-body-secondary flex-grow-1">
              {item.description.length > 60
                ? `${item.description.substring(0, 60)}...`
                : item.description}
            </p>
            <div className="d-flex gap-2 mt-2">
              <Link to={`/produce-details/${item.id}`} className="btn btn-sm btn-outline-success flex-grow-1">
                Details
              </Link>
              <button
                onClick={() => toggleBookmark('produce', item.id, item.name)}
                className={`btn btn-sm ${bookmarked ? 'btn-success text-white' : 'btn-outline-success'}`}
                title={bookmarked ? 'Remove bookmark' : 'Bookmark this produce'}
              >
                <i className={`bi ${bookmarked ? 'bi-bookmark-heart-fill' : 'bi-bookmark-heart'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={colClass}>
      <div className="card h-100 bg-body-tertiary border shadow-sm hover-card overflow-hidden">
        <div className="position-relative">
          <img
            src={item.image}
            className="card-img-top"
            style={{ height: '200px', objectFit: 'cover' }}
            alt={item.name}
          />
          <span className="badge position-absolute top-0 start-0 m-2 px-2 py-1" style={{ backgroundColor: '#00a86b' }}>
            {item.category}
          </span>

          <button
            type="button"
            className={`btn btn-sm bookmark-hover-btn ${
              bookmarked ? 'btn-accent text-white' : 'bg-white text-dark border-0'
            } position-absolute top-0 end-0 m-2 rounded-circle shadow-sm`}
            style={{
              width: '34px',
              height: '34px',
              minWidth: '34px',
              minHeight: '34px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              transition: 'all 0.25s ease-in-out'
            }}
            onClick={() => toggleBookmark('produce', item.id, item.name)}
            title={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
          >
            <i
              className={`bi ${bookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'}`}
              style={{
                color: bookmarked ? '#ffffff' : '#152238',
                fontSize: '0.9rem',
                transition: 'transform 0.2s ease-in-out'
              }}
            ></i>
          </button>
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="fw-bold mb-0 text-body">{item.name}</h5>
            <span className="badge bg-secondary-subtle text-body-secondary border">{item.season}</span>
          </div>
          <p className="small text-body-secondary flex-grow-1 mb-3">{item.description}</p>
          <div className="p-2 rounded bg-body border mb-3 small">
            <strong className="text-accent">
              <i className="bi bi-heart-pulse me-1" aria-hidden="true"></i>Benefits:
            </strong>{' '}
            <span className="text-body-secondary">{item.benefits}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="small text-body-secondary">
              <i className="bi bi-shop me-1 text-accent" aria-hidden="true"></i>At {marketCount} local market(s)
            </span>
            <Link to={`/produce-details/${item.id}`} className="btn btn-sm btn-outline-accent">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}