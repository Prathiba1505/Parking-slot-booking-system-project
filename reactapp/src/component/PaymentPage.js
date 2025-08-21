import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state || {}; 

  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
    bankName: "",
    accountNumber: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCardNumber = (num) => /^\d{13,19}$/.test(num.replace(/\D/g, ""));
  const validateExpiry = (exp) => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
    const [month, year] = exp.split("/").map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    return year > currentYear || (year === currentYear && month >= currentMonth);
  };
  const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);

  const handlePayment = async () => {
    if (paymentMethod === "card") {
      if (!validateCardNumber(formData.cardNumber)) return alert("Invalid card number.");
      if (!validateExpiry(formData.expiry)) return alert("Invalid expiry date.");
      if (!validateCVV(formData.cvv)) return alert("Invalid CVV.");
    } else if (paymentMethod === "upi") {
      if (!formData.upiId.includes("@")) return alert("Invalid UPI ID.");
    } else if (paymentMethod === "netbanking") {
      if (!formData.bankName || !formData.accountNumber) return alert("Fill all Net Banking details.");
    } else {
      return alert("Select a payment method.");
    }

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return alert("User not logged in.");

    try {
      const response = await fetch("http://localhost:8081/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          bookingDetails
        })
      });

      if (response.ok) {
        alert("Payment successful! Booking confirmation sent to your email.");
      } else {
        alert("Payment successful, but email could not be sent.");
      }
    } catch (err) {
      console.error(err);
      alert("Payment successful, but email sending failed.");
    }
    setFormData({
      cardNumber: "",
      expiry: "",
      cvv: "",
      upiId: "",
      bankName: "",
      accountNumber: ""
    });
    setPaymentMethod("");
    navigate("/success", { state: bookingDetails });
  };

  const baseFieldStyle = {
    display: "block",
    padding: "12px",
    margin: "10px auto",
    width: "100%",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box"
  };

  const styles = {
    container: { maxWidth: "400px", margin: "50px auto", padding: "25px", textAlign: "center", border: "1px solid #ccc", borderRadius: "12px", boxShadow: "0 3px 15px rgba(0,0,0,0.1)", backgroundColor: "#fff" },
    input: { ...baseFieldStyle },
    selectWrapper: { width: "100%", margin: "10px auto" },
    select: { ...baseFieldStyle, appearance: "none", backgroundColor: "#fff", paddingRight: "40px" },
    button: { padding: "14px 30px", fontSize: "18px", cursor: "pointer", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "6px", marginTop: "10px", width: "100%" }
  };

  return (
    <div style={styles.container}>
      <h1>Payment Page</h1>
      <div style={styles.selectWrapper}>
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={styles.select}>
          <option value="">Select Payment Method</option>
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
          <option value="netbanking">Net Banking</option>
        </select>
      </div>

      {paymentMethod === "card" && (
        <>
          <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} style={styles.input} />
          <input type="text" name="expiry" placeholder="Expiry (MM/YY)" value={formData.expiry} onChange={handleChange} style={styles.input} />
          <input type="password" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} style={styles.input} />
        </>
      )}
      {paymentMethod === "upi" && <input type="text" name="upiId" placeholder="UPI ID" value={formData.upiId} onChange={handleChange} style={styles.input} />}
      {paymentMethod === "netbanking" && (
        <>
          <input type="text" name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} style={styles.input} />
          <input type="text" name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleChange} style={styles.input} />
        </>
      )}

      <button style={styles.button} onClick={handlePayment}>Pay & Confirm</button>
    </div>
  );
}

export default PaymentPage;
