import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BookingHistoryPage.css";

function BookingHistoryPage() {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios.get("/api/booking-history")
      .then((res) => {
        // Filter by logged-in user
        const userHistory = res.data.filter(
          h => Number(h.changedBy?.userId) === Number(userId)
        );
        setBookingHistory(userHistory);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching booking history:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="history-container">
      <h1>Booking History</h1>
      <button className="back-btn" onClick={() => navigate("/home")}>Back to Home</button>

      {loading ? (
        <p>Loading booking history...</p>
      ) : bookingHistory.length === 0 ? (
        <p>No booking history found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Slot</th>
              <th>Status Change</th>
              <th>Previous Status</th>
              <th>New Status</th>
              <th>Changed On</th>
              <th>Notes</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map(history => (
              <tr key={history.historyId}>
                <td>{history.booking?.slotName || "N/A"}</td>
                <td>{history.statusChange}</td>
                <td>{history.previousStatus || "-"}</td>
                <td>{history.newStatus || "-"}</td>
                <td>{new Date(history.changeDate).toLocaleString()}</td>
                <td>{history.notes || "-"}</td>
                <td>{history.reason || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingHistoryPage;
