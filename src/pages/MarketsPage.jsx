import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp, isMarketOpenNow } from '../context/AppContext';
import MarketCard from '../components/MarketCard';

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function MarketsPage() {
  const { markets } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterArea, setFilterArea] = useState(searchParams.get('area') || '');
  const [filterDay, setFilterDay] = useState(searchParams.get('day') || '');
  const [filterProduce, setFilterProduce] = useState(searchParams.get('produce') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortOption, setSortOption] = useState('default');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const area = searchParams.get('area') || '';
    const day = searchParams.get('day') || '';
    const produce = searchParams.get('produce') || '';
    const search = searchParams.get('search') || '';

    setFilterArea(area);
    setFilterDay(day);
    setFilterProduce(produce);
    setSearchQuery(search);
  }, [searchParams]);

  const handleProximitySort = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setSortOption('proximity');
        alert('Markets sorted by nearest distance to your location!');
      },
      () => {
        alert('Location access was denied. Displaying standard market ordering.');
      }
    );
  };

  const filteredMarkets = useMemo(() => {
    let list = [...markets];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.area.toLowerCase().includes(q) ||
        m.produce.some(p => p.toLowerCase().includes(q))
      );
    }

    if (filterArea) {
      list = list.filter(m => m.area === filterArea);
    }

    if (filterDay) {
      list = list.filter(m => m.days.includes(filterDay));
    }

    if (filterProduce) {
      list = list.filter(m => m.produce.includes(filterProduce));
    }

    if (sortOption === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'open') {
      list.sort((a, b) => isMarketOpenNow(b.hours) - isMarketOpenNow(a.hours));
    } else if (sortOption === 'proximity' && userLocation) {
      list.sort((a, b) => {
        const distA = getDistanceKm(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
        const distB = getDistanceKm(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
        return distA - distB;
      });
    }

    return list;
  }, [markets, searchQuery, filterArea, filterDay, filterProduce, sortOption, userLocation]);

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
              <li className="breadcrumb-item active text-muted" aria-current="page">
                Market Directory
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold text-accent mb-1">Farmers' Market Directory</h1>
            <p className="text-muted mb-0">Browse and discover local community markets near you</p>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <button
              id="geoLocateBtn"
              onClick={handleProximitySort}
              className="btn btn-outline-accent btn-sm"
            >
              <i className="bi bi-geo-fill me-1"></i> Sort by Nearest Distance
            </button>
          </div>
        </div>

        {/* FILTERS AND SORT BAR */}
        <div className="card shadow-lg mb-4 p-3">
          <div className="row g-3">
            <div className="col-md-3 col-sm-6">
              <label className="form-label small fw-semibold text-accent">Filter by Area</label>
              <select
                id="filterArea"
                className="form-select form-select-sm"
                value={filterArea}
                onChange={(e) => setFilterArea(e.target.value)}
              >
                <option value="">All Areas</option>
                <option value="DHA">DHA</option>
                <option value="Gulshan">Gulshan</option>
                <option value="Clifton">Clifton</option>
                <option value="North Nazimabad">North Nazimabad</option>
                <option value="Saddar">Saddar</option>
                <option value="Bahadurabad">Bahadurabad</option>
                <option value="PECHS">PECHS</option>
                <option value="Malir">Malir</option>
                <option value="Super Highway">Super Highway</option>
              </select>
            </div>
            <div className="col-md-3 col-sm-6">
              <label className="form-label small fw-semibold text-accent">Filter by Day</label>
              <select
                id="filterDay"
                className="form-select form-select-sm"
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
              >
                <option value="">All Days</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="col-md-3 col-sm-6">
              <label className="form-label small fw-semibold text-accent">Filter by Produce</label>
              <select
                id="filterProduce"
                className="form-select form-select-sm"
                value={filterProduce}
                onChange={(e) => setFilterProduce(e.target.value)}
              >
                <option value="">All Produce</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Herbs">Herbs</option>
                <option value="Dairy">Dairy</option>
                <option value="Eggs">Eggs</option>
                <option value="Honey">Honey</option>
                <option value="Organic">Organic Products</option>
              </select>
            </div>
            <div className="col-md-3 col-sm-6">
              <label className="form-label small fw-semibold text-accent">Sort By</label>
              <select
                id="sortMarkets"
                className="form-select form-select-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default Order</option>
                <option value="name">Alphabetically (A-Z)</option>
                <option value="open">Currently Open First</option>
                {userLocation && <option value="proximity">Nearest Distance</option>}
              </select>
            </div>
          </div>
        </div>

        {/* MARKETS CONTAINER */}
        <div className="row g-4" id="marketsGrid">
          {filteredMarkets.length === 0 ? (
            <div className="col-12 text-center py-5" role="alert" aria-live="polite">
              <i className="bi bi-emoji-frown fs-1 text-body-secondary" aria-hidden="true"></i>
              <h4 className="mt-2 text-body-secondary">No markets found matching your selection.</h4>
              <p className="small text-body-secondary">Try clearing some filters or search criteria.</p>
            </div>
          ) : (
            filteredMarkets.map((m) => (
              <MarketCard key={m.id} market={m} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
