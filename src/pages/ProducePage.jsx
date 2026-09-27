import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProduceCard from '../components/ProduceCard';

export default function ProducePage() {
  const { produce, markets, toggleBookmark, isBookmarked } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategoryFromQuery = searchParams.get('category') || 'All';
  const selectedItemName = searchParams.get('item');

  const [activeCategory, setActiveCategory] = useState(selectedCategoryFromQuery);

  useEffect(() => {
    if (searchParams.get('category')) {
      setActiveCategory(searchParams.get('category'));
    }
  }, [searchParams]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      searchParams.delete('item');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  // If item spotlight is active (?item=...)
  if (selectedItemName) {
    const targetName = decodeURIComponent(selectedItemName).toLowerCase();
    const itemData = produce.find(p => p.name.toLowerCase() === targetName) || {
      id: selectedItemName,
      name: selectedItemName,
      category: 'Fresh Produce',
      season: 'In Season',
      description: `Fresh ${selectedItemName} sourced directly from verified regional growers and agricultural cooperatives.`,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      benefits: 'Nutritious, Farm-Fresh, Organically Grown'
    };

    const bookmarked = isBookmarked('produce', itemData.id || itemData.name);
    const stockingMarkets = markets.filter(m =>
      m.produce.some(p => p.toLowerCase() === targetName)
    );

    return (
      <>
        <div className="bg-theme-dark border-bottom py-2">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 small">
                <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-accent">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/produce" className="text-decoration-none text-accent">Produce Guide</Link></li>
                <li className="breadcrumb-item active text-body-secondary" aria-current="page">{itemData.name}</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container py-4">
          <div className="col-12 mb-4">
            <div className="card border bg-body-tertiary shadow-lg overflow-hidden hover-card position-relative" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <button
                type="button"
                className={`btn btn-sm ${bookmarked ? 'btn-accent text-white' : 'btn-outline-secondary bg-body'} position-absolute top-0 end-0 m-3 rounded-circle shadow-sm`}
                style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                onClick={() => toggleBookmark('produce', itemData.id || itemData.name, itemData.name)}
                title={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
              >
                <i className={`bi ${bookmarked ? 'bi-bookmark-fill' : 'bi-bookmark'} fs-5`}></i>
              </button>

              <div className="row g-0 align-items-center">
                <div className="col-md-5 col-lg-4 position-relative">
                  <img
                    src={itemData.image}
                    className="img-fluid w-100"
                    style={{ objectFit: 'cover', maxHeight: '320px', minHeight: '250px' }}
                    alt={itemData.name}
                  />
                </div>
                <div className="col-md-7 col-lg-8 p-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge" style={{ backgroundColor: '#00a86b' }}>{itemData.category}</span>
                    <span className="badge bg-secondary-subtle text-body-secondary border">{itemData.season}</span>
                  </div>
                  <h2 className="fw-bold text-body mb-2">{itemData.name}</h2>
                  <p className="text-body-secondary mb-3">{itemData.description}</p>

                  <div className="p-3 rounded bg-body border mb-3">
                    <h6 className="fw-bold text-accent mb-1">
                      <i className="bi bi-heart-pulse me-2" aria-hidden="true"></i>Health & Nutritional Benefits
                    </h6>
                    <p className="small text-body-secondary mb-0">{itemData.benefits}</p>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                    <span className="fw-semibold text-accent small">
                      <i className="bi bi-geo-alt-fill me-1" aria-hidden="true"></i>Available at {stockingMarkets.length} Market(s)
                    </span>
                    <Link to="/produce" className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>View All Produce
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MARKETS STOCKING THIS ITEM */}
          <div className="col-12 mt-2 mb-3">
            <h4 className="fw-bold text-body mb-0">
              <i className="bi bi-shop me-2 text-accent" aria-hidden="true"></i>Markets Stocking {itemData.name}
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
                      <p className="small text-body-secondary flex-grow-1">{m.description.substring(0, 80)}...</p>
                      <div className="mb-3 small text-body-secondary">
                        <strong>Days:</strong> {m.days.join(', ')}<br />
                        <strong>Hours:</strong> {m.hours.open} - {m.hours.close}
                      </div>
                      <Link to={`/market-details/${m.id}`} className="btn btn-sm btn-accent w-100">
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

  const filteredProduce = activeCategory === 'All'
    ? produce
    : produce.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const categories = [
    { label: 'All Items', val: 'All' },
    { label: 'Vegetables', val: 'Vegetables' },
    { label: 'Fruits', val: 'Fruits' },
    { label: 'Herbs', val: 'Herbs' },
    { label: 'Dairy & Eggs', val: 'Dairy' },
    { label: 'Honey & Organic', val: 'Honey' }
  ];

  return (
    <>
      {/* BREADCRUMB */}
      <div className="bg-theme-dark border-bottom py-2">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none" style={{ color: '#00a86b' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active text-body-secondary" aria-current="page">Produce Guide</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        <div className="mb-4">
          <h1 className="fw-bold mb-1" style={{ color: '#00a86b' }}>Fresh Produce Guide</h1>
          <p className="text-body-secondary mb-0">Explore fresh fruits, vegetables, herbs, and farm essentials in season</p>
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div className="mb-4 d-flex flex-wrap gap-2" id="produceCategoryFilters">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.val;
            return (
              <button
                key={cat.val}
                className={`btn rounded-pill btn-sm filter-btn ${isActive ? 'active text-white' : ''}`}
                style={
                  isActive
                    ? { backgroundColor: '#00a86b', borderColor: '#00a86b' }
                    : { color: '#00a86b', borderColor: '#00a86b', backgroundColor: 'transparent' }
                }
                onClick={() => handleCategoryClick(cat.val)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* PRODUCE GRID */}
        <div className="row g-4" id="produceGrid">
          {filteredProduce.length === 0 ? (
            <div className="col-12 text-center py-5">
              <i className="bi bi-emoji-frown fs-1 text-body-secondary" aria-hidden="true"></i>
              <h4 className="mt-2 text-body-secondary">No items found for this category.</h4>
            </div>
          ) : (
            filteredProduce.map((p) => (
              <ProduceCard key={p.id} item={p} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
