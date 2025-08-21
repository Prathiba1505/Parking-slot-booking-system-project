import React, { useEffect, useState } from "react";
import "./FacilitiesPage.css"; 

function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(""); 

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.role) {
      setRole(userData.role);
    }

    fetchFacilities();
  }, []);

  const fetchFacilities = () => {
    setLoading(true);
    fetch("http://localhost:8081/facilities")
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching facilities:", err);
        setLoading(false);
      });
  };

  const handleAddFacility = (e) => {
    e.preventDefault();
    const newFacility = {
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

    fetch("http://localhost:8081/facilities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFacility)
    })
      .then((res) => res.json())
      .then((data) => {
        setFacilities([...facilities, data]);
        e.target.reset();
      })
      .catch((err) => console.error("Error adding facility:", err));
  };

  return (
    <div className="history-page">
      <div className="history-box">
        <h1 className="history-title">Facilities</h1>

        {role === "ADMIN" && (
          <div className="add-facility-form">
            <h2>Add Facility</h2>
            <form onSubmit={handleAddFacility}>
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
              <button type="submit">Add Facility</button>
            </form>
          </div>
        )}

        <div className="table-wrapper">
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading facilities...</p>
          ) : facilities.length === 0 ? (
            <p style={{ textAlign: "center" }}>No facilities found.</p>
          ) : (
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip Code</th>
                  <th>Slots</th>
                  <th>Operating Hours</th>
                  <th>Contact</th>
                  <th>Manager ID</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {facilities.map((facility) => (
                  <tr key={facility.facilityId}>
                    <td>{facility.facilityName}</td>
                    <td>{facility.address}</td>
                    <td>{facility.city}</td>
                    <td>{facility.state}</td>
                    <td>{facility.zipCode}</td>
                    <td>{facility.totalSlots}</td>
                    <td>{facility.operatingHours || "-"}</td>
                    <td>{facility.contactInfo || "-"}</td>
                    <td>{facility.managerId}</td>
                    <td>{facility.latitude || "-"}</td>
                    <td>{facility.longitude || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bottom-nav">
          <button
            className="back-btn"
            onClick={() => (window.location.href = "/home")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Facilities;
