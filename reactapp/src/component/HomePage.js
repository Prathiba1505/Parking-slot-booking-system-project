// src/component/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; 

function HomePage({ user }) {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');

    if (user?.email) {
      setUserEmail(user.email);
    } else if (storedEmail) {
      setUserEmail(storedEmail);
    } else {
      navigate('/'); 
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Parking Slot Booking System</h1>
      {userEmail && <h3>Logged in as: {userEmail}</h3>}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default HomePage;
