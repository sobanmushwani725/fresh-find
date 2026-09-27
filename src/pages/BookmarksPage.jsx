import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function BookmarksPage() {
  const { bookmarks, saveNote, exportBookmarksTxt, toggleBookmark } = useApp();

  const shareOnSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out my saved fresh markets and local seasonal produce on FreshFind!");

    let shareUrl = "#";
    if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    else if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    else if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    else if (platform === 'email') shareUrl = `mailto:?subject=FreshFind%20Favorites&body=${text}%20${url}`;

    window.open(shareUrl, '_blank');
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
              <li className="breadcrumb-item active text-muted" aria-current="page">Saved Favorites</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="fw-bold text-accent mb-1">
              <i className="bi bi-bookmark-star text-accent me-2"></i>Saved Favorites & Shopping Notes
            </h1>
            <p className="text-muted mb-0">Manage your saved markets, seasonal produce, and personal notes</p>
          </div>
          <button onClick={exportBookmarksTxt} className="btn btn-accent">
            <i className="bi bi-download me-1"></i> Export Bookmarks
          </button>
        </div>

        <div className="row g-4">
          {/* Markets Section */}
          <div className="col-lg-6">
            <div className="card border shadow-sm p-3 h-100">
              <h5 className="fw-bold text-accent border-bottom pb-2 mb-3">
                <i className="bi bi-shop me-2 text-accent"></i>Bookmarked Markets
              </h5>
              <div id="savedMarketsList" className="d-flex flex-column gap-3">
                {bookmarks.markets.length === 0 ? (
                  <p className="text-muted small my-2">No markets bookmarked yet.</p>
                ) : (
                  bookmarks.markets.map((m) => (
                    <div key={m.id} className="border rounded p-3 d-flex justify-content-between align-items-center shadow-sm">
                      <div className="flex-grow-1 me-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-1 fw-bold text-accent">{m.name}</h6>
                          <button
                            type="button"
                            onClick={() => toggleBookmark('market', m.id, m.name)}
                            className="btn btn-sm text-danger p-0 border-0"
                            title="Remove bookmark"
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm mt-2"
                          placeholder="Add session note..."
                          value={bookmarks.notes[`m_${m.id}`] || ''}
                          onChange={(e) => saveNote(`m_${m.id}`, e.target.value)}
                        />
                      </div>
                      <Link to={`/market-details/${m.id}`} className="btn btn-sm btn-outline-accent ms-2 fw-semibold">
                        View
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Produce Section */}
          <div className="col-lg-6">
            <div className="card border shadow-sm p-3 h-100">
              <h5 className="fw-bold text-accent border-bottom pb-2 mb-3">
                <i className="bi bi-basket me-2 text-accent"></i>Bookmarked Produce
              </h5>
              <div id="savedProduceList" className="d-flex flex-column gap-3">
                {bookmarks.produce.length === 0 ? (
                  <p className="text-muted small my-2">No produce items bookmarked yet.</p>
                ) : (
                  bookmarks.produce.map((p) => (
                    <div key={p.id} className="border rounded p-3 d-flex justify-content-between align-items-center shadow-sm">
                      <div className="flex-grow-1 me-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-1 fw-bold text-accent">{p.name}</h6>
                          <button
                            type="button"
                            onClick={() => toggleBookmark('produce', p.id, p.name)}
                            className="btn btn-sm text-danger p-0 border-0"
                            title="Remove bookmark"
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm mt-2"
                          placeholder="Add session note..."
                          value={bookmarks.notes[`p_${p.id}`] || ''}
                          onChange={(e) => saveNote(`p_${p.id}`, e.target.value)}
                        />
                      </div>
                      <Link to={`/produce-details/${p.id}`} className="btn btn-sm btn-outline-accent ms-2 fw-semibold">
                        View
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SHARE OPTIONS */}
        <div className="card border shadow-sm p-3 mt-4 text-center">
          <h6 className="fw-bold text-accent mb-3">Share Your Saved Favorites with Family & Friends</h6>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-outline-accent btn-sm" onClick={() => shareOnSocial('whatsapp')}>
              <i className="bi bi-whatsapp me-1"></i> WhatsApp
            </button>
            <button className="btn btn-outline-accent btn-sm" onClick={() => shareOnSocial('facebook')}>
              <i className="bi bi-facebook me-1"></i> Facebook
            </button>
            <button className="btn btn-outline-accent btn-sm" onClick={() => shareOnSocial('twitter')}>
              <i className="bi bi-twitter-x me-1"></i> Twitter / X
            </button>
            <button className="btn btn-outline-accent btn-sm" onClick={() => shareOnSocial('email')}>
              <i className="bi bi-envelope me-1"></i> Email
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
