import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutPage.css";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-sidebar">
        <h2>Menu</h2>
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={() => navigate("/settings")}>Settings</button>
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => { localStorage.removeItem("user"); navigate("/login"); }}>Logout</button>
      </div>

      <div className="about-main">
        <h1>About Parking Slot System</h1>
        <p>
          This Parking Slot System allows users to book parking slots easily, manage their bookings, 
          and view their booking history. This system is designed to improve parking management efficiency 
          and provide a seamless experience for users and administrators alike.
        </p>

        <h2>Features:</h2>
        <ul>
          <li>Easy booking of parking slots</li>
          <li>View booking history</li>
          <li>Manage personal profile and settings</li>
          <li>Admin dashboard for slot management</li>
          <li>Secure login and role-based access</li>
        </ul>

        <h2>Our Vision</h2>
        <p>
          To provide a reliable and convenient parking management system that reduces time spent 
          searching for parking and increases overall efficiency.
        </p>

        <button className="back-btn" onClick={() => navigate("/home")}>Back to Home</button>
      </div>
    </div>
  );
}

export default AboutPage;
