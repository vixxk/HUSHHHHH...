import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RoomPage from './pages/RoomPage';
import NotFound from './pages/NotFound';
import { cleanupExpiredUsers } from './utils/userStorage';
import { clearExpiredMessages } from './utils/messageStorage';

function App() {
  useEffect(() => {
    // Clean up expired data on app load
    cleanupExpiredUsers();
    clearExpiredMessages();

    // Set interval to periodically clean up
    const cleanupInterval = setInterval(() => {
      cleanupExpiredUsers();
      clearExpiredMessages();
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(cleanupInterval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:roomCode" element={<RoomPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
