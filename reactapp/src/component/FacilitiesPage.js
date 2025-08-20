import React, { useEffect, useState } from "react";
import "./FacilitiesPage.css"; 

function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <div className="history-page">
      <div className="history-box">
        <h1 className="history-title">Facilities</h1>

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
                  <th>Contact</th>
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
                    <td>{facility.contactInfo || "-"}</td>
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
