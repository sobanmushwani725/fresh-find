import React, { createContext, useContext, useState, useEffect } from 'react';
import initialMarkets from '../data/markets.json';
import initialProduce from '../data/produce.json';

const AppContext = createContext();

export function isMarketOpenNow(hours) {
  if (!hours || hours.open === 'Closed') return false;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [openH, openM] = hours.open.split(':').map(Number);
  const [closeH, closeM] = hours.close.split(':').map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
}

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth state
  const [loggedUser, setLoggedUser] = useState(() => {
    return localStorage.getItem('ff_logged_user') || '';
  });

  const login = (userId) => {
    localStorage.setItem('ff_logged_user', userId);
    setLoggedUser(userId);
  };

  const logout = () => {
    localStorage.removeItem('ff_logged_user');
    setLoggedUser('');
  };

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('ff_bookmarks');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          markets: parsed.markets || [],
          produce: parsed.produce || [],
          notes: parsed.notes || {}
        };
      }
    } catch (e) {
      console.error(e);
    }
    return { markets: [], produce: [], notes: {} };
  });

  const saveBookmarksToStorage = (updated) => {
    setBookmarks(updated);
    localStorage.setItem('ff_bookmarks', JSON.stringify(updated));
  };

  const toggleBookmark = (type, id, name, suppressAlert = false) => {
    const numericOrStrId = isNaN(id) ? id : Number(id);
    const listKey = type === 'market' ? 'markets' : 'produce';
    const list = [...bookmarks[listKey]];
    const index = list.findIndex(i => String(i.id) === String(numericOrStrId));

    let updatedList;
    if (index > -1) {
      updatedList = list.filter(i => String(i.id) !== String(numericOrStrId));
      if (!suppressAlert) {
        alert(`Removed ${name} from your bookmarks.`);
      }
    } else {
      updatedList = [...list, { id: numericOrStrId, name }];
      if (!suppressAlert) {
        alert(`Added ${name} to your bookmarks!`);
      }
    }

    const updated = {
      ...bookmarks,
      [listKey]: updatedList
    };
    saveBookmarksToStorage(updated);
  };

  const isBookmarked = (type, id) => {
    const listKey = type === 'market' ? 'markets' : 'produce';
    return (bookmarks[listKey] || []).some(i => String(i.id) === String(id));
  };

  const saveNote = (key, val) => {
    const updated = {
      ...bookmarks,
      notes: {
        ...bookmarks.notes,
        [key]: val
      }
    };
    saveBookmarksToStorage(updated);
  };

  const exportBookmarksTxt = () => {
    let txt = "FreshFind Saved Favorites\n=======================\n\nMarkets:\n";
    bookmarks.markets.forEach((m, idx) => {
      txt += `${idx + 1}. ${m.name} (Note: ${bookmarks.notes['m_' + m.id] || 'None'})\n`;
    });

    txt += "\nProduce:\n";
    bookmarks.produce.forEach((p, idx) => {
      txt += `${idx + 1}. ${p.name} (Note: ${bookmarks.notes['p_' + p.id] || 'None'})\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'FreshFind_Saved_Bookmarks.txt';
    anchor.click();
  };

  // Visitor Counter
  const [visitorCount, setVisitorCount] = useState(() => {
    let baseCount = parseInt(localStorage.getItem('ff_visitor_count') || '12548', 10);
    baseCount += 1;
    localStorage.setItem('ff_visitor_count', baseCount.toString());
    return baseCount;
  });

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        loggedUser,
        login,
        logout,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        saveNote,
        exportBookmarksTxt,
        totalBookmarkCount: bookmarks.markets.length + bookmarks.produce.length,
        visitorCount,
        markets: initialMarkets,
        produce: initialProduce
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
