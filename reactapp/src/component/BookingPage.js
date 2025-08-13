import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingPage() {
  const [name, setName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (name && vehicleNo) {
      navigate("/payment", { state: { name, vehicleNo } });
    } else {
      alert("Please fill all booking details");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Booking Details</h1>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Vehicle Number"
        value={vehicleNo}
        onChange={(e) => setVehicleNo(e.target.value)}
        style={styles.input}
      />
      <button style={styles.button} onClick={handleProceed}>
        Proceed to Payment
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  input: { padding: "10px", margin: "10px", width: "250px" },
  button: { padding: "10px 20px", fontSize: "18px", cursor: "pointer" }
};

export default BookingPage;
