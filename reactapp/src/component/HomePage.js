
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { name: "Home", route: "/home" },
    { name: "Profile", route: "/profile" },
    { name: "Settings", route: "/settings" },
    { name: "About", route: "/about" },
    { name: "Logout", route: "/" }
  ];

  useEffect(() => {
    // Fetch booking history for current user (assuming userId is stored in localStorage)
    const userId = localStorage.getItem("userId"); 
    axios.get(`/api/booking-history`)
      .then((res) => {
        // Filter history by user
        const userHistory = res.data.filter(h => h.changedBy?.id == userId);
        setBookingHistory(userHistory);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching booking history:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="homepage-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">Parking System</div>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="sidebar-btn"
            onClick={() => {
              if (item.name === "Logout") localStorage.removeItem("user");
              navigate(item.route);
            }}
          >
            {item.name}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <section className="hero-section">
          <h1>Welcome to Parking Slot System</h1>
          <p>Manage your bookings, view facilities, and update your profile all in one place.</p>
          <button className="start-btn" onClick={() => navigate("/booking")}>
            Start Booking
          </button>
        </section>

        <section className="dashboard-cards">
          <div className="card">
            <h2>Booking History</h2>
            {loading ? (
              <p>Loading history...</p>
            ) : bookingHistory.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <ul>
                {bookingHistory.slice(0, 5).map((history) => (
                  <li key={history.historyId}>
                    <strong>{history.booking?.slotName || "Slot"}:</strong> {history.statusChange} on {new Date(history.changeDate).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => navigate("/booking-history")}>View Full History</button>
          </div>

          <div className="card">
            <h2>Facilities Details</h2>
            <p>Check available parking facilities, capacity, and other details.</p>
            <button onClick={() => navigate("/facilities")}>View Facilities</button>
          </div>

          <div className="card">
            <h2>Profile</h2>
            <p>Update your personal information and preferences.</p>
            <button onClick={() => navigate("/profile")}>Go to Profile</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
