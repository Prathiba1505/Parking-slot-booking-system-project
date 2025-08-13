import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, vehicleNo } = location.state || {};

  return (
    <div style={styles.container}>
      <h1>🎉 Booking Successful!</h1>
      {name && <p>Name: {name}</p>}
      {vehicleNo && <p>Vehicle No: {vehicleNo}</p>}
      <button style={styles.button} onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { padding: "10px 20px", fontSize: "18px", cursor: "pointer" }
};

export default SuccessPage;
