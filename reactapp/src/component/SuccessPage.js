import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    name,
    vehicleNo,
    vehicleType, 
    slotNumber,
    date,
    time,
    duration,
    contact
  } = location.state || {};

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      userId,
      name,
      vehicleNo,
      vehicleType, 
      slotNumber,
      date,
      time,
      duration,
      contact
    };

    const isDuplicate = existingBookings.some(
      (b) =>
        b.userId === userId &&
        b.slotNumber === slotNumber &&
        b.date === date &&
        b.time === time
    );

    if (!isDuplicate) {
      existingBookings.push(newBooking);
      localStorage.setItem("bookings", JSON.stringify(existingBookings));
    }
  }, [name, vehicleNo, vehicleType, slotNumber, date, time, duration, contact]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h1 style={styles.title}>Booking Successful!</h1>
        <p style={styles.subtitle}>Your parking slot has been confirmed.</p>

        <div style={styles.details}>
          {name && <p><strong>Name:</strong> {name}</p>}
          {vehicleType && <p><strong>Vehicle Type:</strong> {vehicleType}</p>}
          {vehicleNo && <p><strong>Vehicle No:</strong> {vehicleNo}</p>}
          {slotNumber && <p><strong>Slot:</strong> {slotNumber}</p>}
          {date && <p><strong>Date:</strong> {date}</p>}
          {time && <p><strong>Time:</strong> {time}</p>}
          {duration && <p><strong>Duration:</strong> {duration}</p>}
          {contact && <p><strong>Contact:</strong> {contact}</p>}
        </div>

        <button style={styles.button} onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f8f5",
    padding: "20px"
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%"
  },
  icon: {
    fontSize: "50px",
    marginBottom: "10px"
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px"
  },
  details: {
    textAlign: "left",
    fontSize: "16px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px"
  },
  button: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px 25px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default SuccessPage;
