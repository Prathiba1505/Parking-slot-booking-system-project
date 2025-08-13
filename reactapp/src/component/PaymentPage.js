import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handlePayment = () => {
    if (cardNumber && expiry && cvv) {
      navigate("/success", { state: location.state });
    } else {
      alert("Please fill all payment details");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Payment Page</h1>
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Expiry Date"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        style={styles.input}
      />
      <button style={styles.button} onClick={handlePayment}>
        Pay & Confirm
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  input: { padding: "10px", margin: "10px", width: "250px" },
  button: { padding: "10px 20px", fontSize: "18px", cursor: "pointer" }
};

export default PaymentPage;
