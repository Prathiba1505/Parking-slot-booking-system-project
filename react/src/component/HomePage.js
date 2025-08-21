import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [knownFacilities, setKnownFacilities] = useState([]);
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role"); // "admin" or "user"

  const menuItems = [
    { name: "Home", route: "/home" },
    { name: "Profile", route: "/profile" },
    { name: "Settings", route: "/settings" },
    { name: "About", route: "/about" },
    { name: "Logout", route: "/" }
  ];

  useEffect(() => {
    // Fetch booking history
    axios.get(`/api/booking-history`)
      .then((res) => {
        const userHistory = res.data.filter(h => h.changedBy?.id == userId);
        setBookingHistory(userHistory);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching booking history:", err);
        setLoading(false);
      });

    // Fetch facilities and show notifications for unseen ones
    const fetchFacilities = () => {
      axios.get(`/facilities`)
        .then((res) => {
          const fetchedFacilities = res.data;

          // Load seen facilities from localStorage
          const seenFacilityIds = JSON.parse(localStorage.getItem("seenFacilities")) || [];

          // Detect new facilities for this user
          if (role !== "admin") {
            const newFacilities = fetchedFacilities.filter(f => !seenFacilityIds.includes(f.facilityId));
            const newFacilityNotifications = newFacilities.map(f => ({
              id: f.facilityId,
              message: `New facility available: ${f.facilityName} in ${f.city}`,
              date: f.createdDate || new Date()
            }));

            if (newFacilityNotifications.length > 0) {
              setNotifications(prev => [...newFacilityNotifications, ...prev]);
            }

            // Mark all fetched facilities as seen
            const allFacilityIds = fetchedFacilities.map(f => f.facilityId);
            localStorage.setItem("seenFacilities", JSON.stringify(allFacilityIds));
          }

          setKnownFacilities(fetchedFacilities);
        })
        .catch(err => console.error(err));
    };

    fetchFacilities();
    const interval = setInterval(fetchFacilities, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [userId, role]);

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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Welcome to Parking Slot System</h1>

            {/* Notification Icon */}
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span role="img" aria-label="bell" style={{ fontSize: "24px" }}>🔔</span>
              {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
              {showNotifications && (
                <div className="notification-dropdown">
                  {notifications.length === 0 ? <p>No new notifications</p> : (
                    notifications.map(n => (
                      <div key={n.id} className="notification-item">
                        {n.message}
                        <div className="notification-date">{new Date(n.date).toLocaleDateString()}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <p>Manage your bookings, view facilities, and update your profile all in one place.</p>
          <button className="start-btn" onClick={() => navigate("/booking")}>Start Booking</button>
        </section>

        {/* Cards Section */}
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
            {knownFacilities.length === 0 ? (
              <p>No facilities available currently.</p>
            ) : (
              <ul>
                {knownFacilities.map(f => (
                  <li key={f.facilityId}>
                    <strong>{f.facilityName}</strong> in {f.city} - Total Slots: {f.totalSlots}
                  </li>
                ))}
              </ul>
            )}
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
