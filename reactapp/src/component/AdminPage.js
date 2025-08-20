
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [totalSlots, setTotalSlots] = useState(10); 
  const [bookings, setBookings] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingFacilities, setLoadingFacilities] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  useEffect(() => {
    // Fetch bookings
    fetch("http://localhost:8081/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoadingBookings(false);
      })
      .catch(() => setLoadingBookings(false));

    // Fetch facilities (optional)
    fetch("http://localhost:8081/facilities")
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data);
        setLoadingFacilities(false);
      })
      .catch(() => setLoadingFacilities(false));

    // Fetch analytics (optional)
    fetch("http://localhost:8081/facility-analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoadingAnalytics(false);
      })
      .catch(() => setLoadingAnalytics(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  const renderContent = () => {
    if (activeTab === "dashboard") {
      // Calculate remaining available slots by subtracting bookings count from totalSlots
      const availableSlots = totalSlots - bookings.length;

      return (
        <div className="dashboard-content">
          <div className="stat-card">
            <h3>Total Slots</h3>
            <p>{totalSlots}</p>
          </div>
          <div className="stat-card">
            <h3>Available Slots</h3>
            <p>{availableSlots >= 0 ? availableSlots : 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>{loadingBookings ? "Loading..." : bookings.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Facilities</h3>
            <p>{loadingFacilities ? "Loading..." : facilities.length}</p>
          </div>
        </div>
      );
    }

    // ...rest of your tab rendering (bookings, facilities, analytics) unchanged

    if (activeTab === "bookings") {
      if (loadingBookings) return <p>Loading bookings...</p>;
      if (!bookings.length) return <p>No bookings found.</p>;

      return (
        <div>
          <h2>All Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Vehicle</th>
                <th>Start</th>
                <th>End</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId || b.id}>
                  <td>{b.bookingId || b.id}</td>
                  <td>{b.vehicleNumber}</td>
                  <td>{new Date(b.startTime).toLocaleString()}</td>
                  <td>{new Date(b.endTime).toLocaleString()}</td>
                  <td>${b.totalCost}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === "facilities") {
      if (loadingFacilities) return <p>Loading facilities...</p>;
      if (!facilities.length) return <p>No facilities found.</p>;

      return (
        <div>
          <h2>Facilities</h2>
          <table>
            <thead>
              <tr>
                <th>Facility ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Total Slots</th>
                <th>Operating Hours</th>
                <th>Contact Info</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((f) => (
                <tr key={f.facilityId}>
                  <td>{f.facilityId}</td>
                  <td>{f.facilityName}</td>
                  <td>{f.address}</td>
                  <td>{f.city}</td>
                  <td>{f.state}</td>
                  <td>{f.totalSlots}</td>
                  <td>{f.operatingHours || "-"}</td>
                  <td>{f.contactInfo || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === "analytics") {
      if (loadingAnalytics) return <p>Loading facility analytics...</p>;
      if (!analytics.length) return <p>No analytics data available.</p>;

      return (
        <div>
          <h2>Facility Analytics</h2>
          <table>
            <thead>
              <tr>
                <th>Analytics ID</th>
                <th>Facility</th>
                <th>Date</th>
                <th>Total Bookings</th>
                <th>Occupancy Rate (%)</th>
                <th>Revenue ($)</th>
                <th>Avg Booking Duration (hrs)</th>
                <th>Peak Hours</th>
                <th>Utilization Score</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((a) => (
                <tr key={a.analyticsId}>
                  <td>{a.analyticsId}</td>
                  <td>{a.facility.facilityName}</td>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.totalBookings}</td>
                  <td>{(a.occupancyRate * 100).toFixed(2)}</td>
                  <td>${a.revenue.toFixed(2)}</td>
                  <td>{a.averageBookingDuration.toFixed(2)}</td>
                  <td>{a.peakHours || "-"}</td>
                  <td>{a.utilizationScore.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveTab("bookings")}>View Bookings</li>
          <li onClick={() => setActiveTab("facilities")}>Facilities</li>
          <li onClick={() => setActiveTab("analytics")}>Facility Analytics</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="topbar">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminPage;
