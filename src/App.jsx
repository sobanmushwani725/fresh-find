import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LiveBanner from './components/LiveBanner';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

import HomePage from './pages/HomePage';
import MarketsPage from './pages/MarketsPage';
import MarketDetailPage from './pages/MarketDetailPage';
import ProducePage from './pages/ProducePage';
import ProduceDetailPage from './pages/ProduceDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookmarksPage from './pages/BookmarksPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <Navbar />
      <LiveBanner />
      
      <main className="flex-grow-1">
        <Routes>
          {/* Main Clean Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/market-details" element={<MarketDetailPage />} />
          <Route path="/market-details/:id" element={<MarketDetailPage />} />
          <Route path="/produce" element={<ProducePage />} />
          <Route path="/produce-details" element={<ProduceDetailPage />} />
          <Route path="/produce-details/:id" element={<ProduceDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Legacy .html Aliases for 100% Backward Compatibility */}
          <Route path="/index.html" element={<HomePage />} />
          <Route path="/markets.html" element={<MarketsPage />} />
          <Route path="/market-details.html" element={<MarketDetailPage />} />
          <Route path="/produce.html" element={<ProducePage />} />
          <Route path="/produce-details.html" element={<ProduceDetailPage />} />
          <Route path="/about.html" element={<AboutPage />} />
          <Route path="/contact.html" element={<ContactPage />} />
          <Route path="/bookmarks.html" element={<BookmarksPage />} />
          <Route path="/login.html" element={<LoginPage />} />
          <Route path="/signup.html" element={<SignupPage />} />

          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
