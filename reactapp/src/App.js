import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import HomePage from './component/HomePage';
import './App.css'; 

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('userEmail', userData.email); 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage user={user} />} />
      </Routes>
      <nav className="nav-bar">
        <Link to="/">Login</Link>
        <span className="separator">|</span>
        <Link to="/signup">Signup</Link>
      </nav>
    </Router>

  );
}

export default App;
