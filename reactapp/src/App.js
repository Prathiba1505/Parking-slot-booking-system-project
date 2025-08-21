import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Login from './component/Login';
import Signup from './component/Signup';
import HomePage from './component/HomePage';
import AdminLogin from './component/AdminLogin';
import AdminPage from './component/AdminPage';
import ProfilePage from './component/ProfilePage';
import BookingPage from './component/BookingPage';
import PaymentPage from './component/PaymentPage';
import SuccessPage from './component/SuccessPage';
import BookingHistoryPage from './component/BookingHistoryPage';
import FacilitiesPage from './component/FacilitiesPage';
import AboutPage from './component/AboutPage';
import SettingsPage from './component/SettingsPage';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserEmail = localStorage.getItem('userEmail');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');
    if (storedUserId) {
      setUser({
        userId: storedUserId,
        email: storedUserEmail,
        role: storedUserRole,
        username: storedUsername
      });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('userId', userData.userId || userData.id);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userRole', userData.role || 'user');
    localStorage.setItem('username', userData.username || '');
  };

  return (
    <Router>
      <AppContent user={user} onLogin={handleLogin} />
    </Router>
  );
}

function PrivateRoute({ children }) {
  const userId = localStorage.getItem('userId');
  return userId ? children : <Navigate to="/" replace />;
}

function AdminRoute({ children }) {
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('userRole');
  if (!userId) return <Navigate to="/admin-login" replace />;
  if (role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

function AppContent({ user, onLogin }) {
  const location = useLocation();
  const showPublicNav =
    location.pathname === '/' ||
    location.pathname === '/signup' ||
    location.pathname === '/admin-login';

  return (
    <>
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        <Route path="/booking" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
        <Route path="/success" element={<PrivateRoute><SuccessPage /></PrivateRoute>} />
        <Route path="/booking-history" element={<PrivateRoute><BookingHistoryPage /></PrivateRoute>} />
        <Route path="/facilities" element={<PrivateRoute><FacilitiesPage /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>} />
        <Route path="/admin-login" element={<AdminLogin onLogin={onLogin} />} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      </Routes>
      {showPublicNav && (
        <nav className="nav-bar">
          <a href="/">Login</a>
          <span className="separator">|</span>
          <a href="/signup">Signup</a>
          <span className="separator">|</span>
          <a href="/admin-login">Admin Login</a>
        </nav>
      )}
    </>
  );
}

export default App;
