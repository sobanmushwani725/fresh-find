import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useApp, isMarketOpenNow } from '../context/AppContext';

const produceMeta = {
  Tomatoes: {
    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
    icon: "bi-egg-fried"
  },
  Apples: {
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80",
    icon: "bi-apple"
  },
  Carrots: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2CG7nst5ZSKV_GTX7go9DG5x88xNjeATdoczeJZSBGg&s=10",
    icon: "bi-flower2"
  },
  Honey: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHecmVI1qfekS2eWF9xuQHkMxe6_bwadralPOrS8ACPA&s=10",
    icon: "bi-flower1"
  },
  Eggs: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_nYGN2a83PgjJ-JOf7KA4cT4od096VpmHxG_e9pBOw&s=10",
    icon: "bi-egg"
  },
  Spinach: {
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80",
    icon: "bi-tree"
  },
  Strawberries: {
    img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80",
    icon: "bi-heart-fill"
  },
  Dairy: {
    img: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&w=500&q=80",
    icon: "bi-cup-straw"
  },
  Herbs: {
    img: "https://emi.parkview.com/media/Image/Dashboard_835_Herbs_9_23.jpeg",
    icon: "bi-square-fill"
  },
  Potatoes: {
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80",
    icon: "bi-circle-fill"
  },
  Fruits: {
    img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=500&q=80",
    icon: "bi-basket2-fill"
  },
  Vegetables: {
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    icon: "bi-basket"
  },
  Organic: {
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    icon: "bi-patch-check-fill"
  },
  Lemon: {
    img: "https://images.cookforyourlife.org/wp-content/uploads/2018/08/shutterstock_278111387-min-e1444253668574-1024x989.jpg",
    icon: "bi-sun-fill"
  },
  Lemons: {
    img: "https://images.cookforyourlife.org/wp-content/uploads/2018/08/shutterstock_278111387-min-e1444253668574-1024x989.jpg",
    icon: "bi-sun-fill"
  },
  'Mint & Cilantro': {
    img: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80",
    icon: "bi-patch-check-fill"
  }
};

const defaultMeta = {
  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80",
  icon: "bi-basket"
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MarketDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { markets, toggleBookmark, isBookmarked } = useApp();

  const marketId = id ? parseInt(id, 10) : parseInt(searchParams.get('id') || '1', 10);
  const market = markets.find(m => m.id === marketId) || markets[0];

  if (!market) {
    return (
      <div className="container py-5 text-center">
        <h2>Market Not Found</h2>
        <Link to="/markets" className="btn btn-accent mt-3">Back to Markets</Link>
      </div>
    );
  }

  const isOpen = isMarketOpenNow(market.hours);
  const bookmarked = isBookmarked('market', market.id);

  // Robust lookup helper handling exact match, singular, or plural forms
  const getProduceMeta = (item) => {
    if (produceMeta[item]) return produceMeta[item];
    const singular = item.endsWith('s') ? item.slice(0, -1) : item;
    const plural = `${item}s`;
    return produceMeta[singular] || produceMeta[plural] || defaultMeta;
  };

  return (
    <>
      {/* BREADCRUMB */}
      <div className="bg-theme-dark border-bottom py-2">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-accent text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/markets" className="text-accent text-decoration-none">
                  Market Directory
                </Link>
              </li>
              <li className="breadcrumb-item active text-muted" aria-current="page" id="breadcrumbMarketName">
                {market.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5" id="marketDetailContainer">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border bg-body-tertiary p-3 mb-4 shadow-lg hover-card">
              <img
                src={market.image}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: '380px', width: '100%', objectFit: 'cover' }}
                alt={`High resolution photo of ${market.name}`}
              />
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="fw-bold text-accent mb-0">{market.name}</h2>
                <span className={`badge ${isOpen ? 'bg-success text-white' : 'bg-secondary text-white'} fs-6`}>
                  {isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
              <p className="text-body-secondary mt-2">
                <i className="bi bi-geo-alt-fill text-accent me-1" aria-hidden="true"></i>
                {market.address}, {market.area}
              </p>
              <hr className="border" />
              <h5 className="fw-bold text-accent">About This Market</h5>
              <p className="text-body">{market.description}</p>
            </div>

            {/* WEEKLY SCHEDULE TABLE */}
            <div className="card border bg-body-tertiary p-3 mb-4 shadow-lg hover-card">
              <h5 className="fw-bold text-accent mb-3">
                <i className="bi bi-calendar-week me-2 text-accent" aria-hidden="true"></i>Weekly Operating Schedule
              </h5>
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0 small" aria-label="Operating Schedule">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Opening Time</th>
                      <th scope="col">Closing Time</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daysOfWeek.map((d) => {
                      const isOperating = market.days.includes(d);
                      return (
                        <tr key={d}>
                          <th scope="row" className="fw-semibold text-body">{d}</th>
                          <td className="text-body">{isOperating ? market.hours.open : 'Closed'}</td>
                          <td className="text-body">{isOperating ? market.hours.close : 'Closed'}</td>
                          <td>
                            <span
                              className={`badge ${
                                isOperating
                                  ? 'bg-success-subtle text-success border border-success'
                                  : 'bg-secondary-subtle text-body-secondary'
                              }`}
                            >
                              {isOperating ? 'Active' : 'Off-day'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border bg-body-tertiary p-3 mb-4 shadow-lg hover-card">
              <h5 className="fw-bold text-accent mb-3">
                <i className="bi bi-basket me-2 text-accent" aria-hidden="true"></i>Produce Categories
              </h5>
              <div className="d-flex flex-wrap gap-2">
                {market.produce.map((p) => (
                  <span key={p} className="badge bg-success-subtle text-success border border-success p-2">
                    <i className="bi bi-check2-circle me-1" aria-hidden="true"></i>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="card border bg-body-tertiary p-3 mb-4 shadow-lg hover-card">
              <h5 className="fw-bold text-accent mb-3">
                <i className="bi bi-geo-fill me-2 text-accent" aria-hidden="true"></i>Market Map Location
              </h5>
              <div className="ratio ratio-4x3 rounded overflow-hidden">
                <iframe
                  src={`https://maps.google.com/maps?q=${market.latitude},${market.longitude}&z=14&output=embed`}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title={`Google Map location of ${market.name}`}
                ></iframe>
              </div>
            </div>

            <button
              onClick={() => toggleBookmark('market', market.id, market.name)}
              className={`btn ${bookmarked ? 'btn-accent text-white' : 'btn-outline-accent'} w-100 fw-semibold`}
              aria-label={`Bookmark ${market.name}`}
            >
              <i className={`bi ${bookmarked ? 'bi-bookmark-heart-fill' : 'bi-bookmark-heart'} me-1`} aria-hidden="true"></i>
              {bookmarked ? 'Bookmarked in Favorites' : 'Bookmark This Market'}
            </button>
          </div>
        </div>

        {/* DYNAMIC PRODUCTS AVAILABLE GRID */}
        <section className="mt-4 pb-2" aria-labelledby="products-heading">
          <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-secondary">
            <div>
              <h3 id="products-heading" className="fw-bold text-accent mb-1">
                <i className="bi bi-shop me-2" aria-hidden="true"></i>Products Available at {market.name}
              </h3>
              <p className="text-muted small mb-0">Seasonal produce and items currently supplied by vendors at this location.</p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {market.produce.map((item) => {
              const meta = getProduceMeta(item);
              return (
                <div className="col" key={item}>
                  <div className="card h-100 border-secondary bg-body-tertiary shadow-sm hover-card">
                    <div className="position-relative">
                      <img
                        src={meta.img}
                        className="card-img-top"
                        alt={`Fresh ${item}`}
                        style={{ height: '160px', objectFit: 'cover' }}
                      />
                      <span className="badge bg-success position-absolute top-0 end-0 m-2">
                        <i className="bi bi-patch-check-fill me-1" aria-hidden="true"></i>Available
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className={`bi ${meta.icon} text-accent fs-5`} aria-hidden="true"></i>
                        <h6 className="card-title fw-bold mb-0">{item}</h6>
                      </div>
                      <p className="card-text text-muted small">
                        Freshly sourced from local agricultural partners near {market.area}.
                      </p>
                    </div>
                    <div className="card-footer bg-transparent border-0 pt-0 d-flex justify-content-between align-items-center">
                      <span className="badge bg-outline border border-success text-accent">Fresh Produce</span>
                      <Link
                        to={`/produce?item=${encodeURIComponent(item)}`}
                        className="btn btn-sm btn-outline-accent py-0 px-2 fs-7"
                        aria-label={`Learn more about ${item}`}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}