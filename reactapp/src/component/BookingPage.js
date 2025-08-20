import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    vehicleNo: "",
    vehicleType: "",
    slotNumber: "",
    date: "",
    time: "",
    duration: "",
    contact: ""
  });

  const availableSlots = ["A1", "A2", "B1", "B2", "C1"];
  const vehicleTypes = ["Car", "Bike", "Truck", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceed = () => {
    const { name, vehicleNo, vehicleType, slotNumber, date, time, duration } = formData;
    const vehicleNoPattern = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/i;
    if (!name || !vehicleNo || !vehicleType || !slotNumber || !date || !time || !duration) {
      alert("Please fill all required booking details");
      return;
    }
    if (!vehicleNoPattern.test(vehicleNo)) {
      alert("Please enter a valid vehicle number (e.g., TN01AB1234)");
      return;
    }
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const duplicate = savedBookings.find(
      (b) =>
        b.slotNumber === slotNumber &&
        b.date === date &&
        b.time === time &&
        b.vehicleNo.toUpperCase() === vehicleNo.toUpperCase()
    );

    if (duplicate) {
      alert("This booking already exists for the same slot, date, time, and vehicle.");
      return;
    }
    savedBookings.push(formData);
    localStorage.setItem("bookings", JSON.stringify(savedBookings));

    navigate("/payment", { state: formData });
  };

  return (
    <div style={styles.container}>
      <h1>Book Now</h1>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="text"
        name="vehicleNo"
        placeholder="Vehicle Number (e.g., TN01AB1234)"
        value={formData.vehicleNo}
        onChange={handleChange}
        style={styles.input}
      />

      <div style={styles.selectWrapper}>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Select Vehicle Type</option>
          {vehicleTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.selectWrapper}>
        <select
          name="slotNumber"
          value={formData.slotNumber}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Select Parking Slot</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        name="duration"
        placeholder="Parking Duration (e.g., 30 min, 1 hour)"
        value={formData.duration}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="text"
        name="contact"
        placeholder="Contact Number (Optional)"
        value={formData.contact}
        onChange={handleChange}
        style={styles.input}
      />

      <button style={styles.button} onClick={handleProceed}>
        Proceed to Payment
      </button>
    </div>
  );
}

const baseFieldStyle = {
  display: "block",
  padding: "12px",
  margin: "10px auto",
  width: "100%",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  height: "45px"
};

const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "25px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "12px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#fff"
  },
  input: {
    ...baseFieldStyle
  },
  selectWrapper: {
    position: "relative",
    width: "100%",
    margin: "10px auto"
  },
  select: {
    ...baseFieldStyle,
    lineHeight: "21px",
    appearance: "none",
    backgroundColor: "#fff",
    backgroundImage:
      "url('data:image/svg+xml;utf8,<svg fill=%22%23000000%22 height=%2220%22 viewBox=%220 0 24 24%22 width=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "20px",
    paddingRight: "40px"
  },
  button: {
    padding: "14px 30px",
    fontSize: "18px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px",
    width: "100%"
  }
};

export default BookingPage;
