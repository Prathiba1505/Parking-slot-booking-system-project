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

  const [editFacilityId, setEditFacilityId] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchFacilities();
    fetchAnalytics();
  }, []);

  const fetchBookings = () => {
    fetch("http://localhost:8081/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoadingBookings(false);
      })
      .catch(() => setLoadingBookings(false));
  };

  const fetchFacilities = () => {
    fetch("http://localhost:8081/facilities")
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data);
        setLoadingFacilities(false);
      })
      .catch(() => setLoadingFacilities(false));
  };

  const fetchAnalytics = () => {
    fetch("http://localhost:8081/facility-analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoadingAnalytics(false);
      })
      .catch(() => setLoadingAnalytics(false));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  const handleAddFacility = (e) => {
    e.preventDefault();
    const facilityData = {
      facilityName: e.target.facilityName.value,
      address: e.target.address.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zipCode: e.target.zipCode.value,
      totalSlots: parseInt(e.target.totalSlots.value),
      operatingHours: e.target.operatingHours.value,
      contactInfo: e.target.contactInfo.value,
      managerId: parseInt(e.target.managerId.value),
      latitude: e.target.latitude.value ? parseFloat(e.target.latitude.value) : null,
      longitude: e.target.longitude.value ? parseFloat(e.target.longitude.value) : null
    };

    if (editFacilityId) {
      fetch(`http://localhost:8081/facilities/${editFacilityId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(facilityData)
      })
        .then((res) => res.json())
        .then(() => {
          fetchFacilities();
          e.target.reset();
          setEditFacilityId(null);
        })
        .catch((err) => console.error("Error updating facility:", err));
    } else {
      fetch("http://localhost:8081/facilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(facilityData)
      })
        .then((res) => res.json())
        .then((data) => {
          setFacilities([...facilities, data]);
          e.target.reset();
        })
        .catch((err) => console.error("Error adding facility:", err));
    }
  };

  const handleEditFacility = (facility) => {
    setEditFacilityId(facility.facilityId);

    const form = document.getElementById("facility-form");
    form.facilityName.value = facility.facilityName;
    form.address.value = facility.address;
    form.city.value = facility.city;
    form.state.value = facility.state;
    form.zipCode.value = facility.zipCode;
    form.totalSlots.value = facility.totalSlots;
    form.operatingHours.value = facility.operatingHours || "";
    form.contactInfo.value = facility.contactInfo || "";
    form.managerId.value = facility.managerId;
    form.latitude.value = facility.latitude || "";
    form.longitude.value = facility.longitude || "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteFacility = (facilityId) => {
    if (!window.confirm("Are you sure you want to delete this facility?")) return;
    fetch(`http://localhost:8081/facilities/${facilityId}`, { method: "DELETE" })
      .then(() => fetchFacilities())
      .catch((err) => console.error("Error deleting facility:", err));
  };

  const renderContent = () => {
    if (activeTab === "dashboard") {
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
      return (
        <div>
          <h2>Facilities</h2>

          <div className="facility-form">
            <h3>{editFacilityId ? "Edit Facility" : "Add New Facility"}</h3>
            <form id="facility-form" onSubmit={handleAddFacility}>
              <input name="facilityName" placeholder="Facility Name" required />
              <input name="address" placeholder="Address" required />
              <input name="city" placeholder="City" required />
              <input name="state" placeholder="State" required />
              <input name="zipCode" placeholder="Zip Code" required />
              <input name="totalSlots" type="number" placeholder="Total Slots" required />
              <input name="operatingHours" placeholder="Operating Hours" />
              <input name="contactInfo" placeholder="Contact Info" />
              <input name="managerId" type="number" placeholder="Manager ID" required />
              <input name="latitude" type="number" step="0.000001" placeholder="Latitude" />
              <input name="longitude" type="number" step="0.000001" placeholder="Longitude" />
              <button type="submit">{editFacilityId ? "Update Facility" : "Add Facility"}</button>
            </form>
          </div>

          {loadingFacilities ? (
            <p>Loading facilities...</p>
          ) : facilities.length === 0 ? (
            <p>No facilities found.</p>
          ) : (
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
                  <th>Actions</th>
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
                    <td>
  <div className="action-buttons">
    <button className="edit-btn" onClick={() => handleEditFacility(f)}>Edit</button>
    <button className="delete-btn" onClick={() => handleDeleteFacility(f.facilityId)}>Delete</button>
  </div>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
