import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingHistoryPage.css";

function BookingHistoryPage() {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const userId = localStorage.getItem("userId");
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const userBookings = allBookings.filter(
      (b) => String(b.userId) === String(userId)
    );
    setBookingHistory(userBookings);
    setLoading(false);
  };

  const cancelBooking = (index) => {
    if (window.confirm("Cancel this booking?")) {
      const userId = localStorage.getItem("userId");
      let allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

      const bookingToCancel = bookingHistory[index];
      allBookings = allBookings.map((b) =>
        String(b.userId) === String(userId) &&
        b.slotNumber === bookingToCancel.slotNumber &&
        b.date === bookingToCancel.date &&
        b.time === bookingToCancel.time
          ? { ...b, status: "Cancelled" }
          : b
      );

      localStorage.setItem("bookings", JSON.stringify(allBookings));
      loadBookings();
    }
  };

  return (
    <div className="history-page">
      <div className="history-box">
        <h1 className="history-title">My Booking History</h1>

        {loading ? (
          <p className="loading-text">Loading booking history...</p>
        ) : bookingHistory.length === 0 ? (
          <p className="empty-text">No booking history found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Slot</th>
                  <th>Vehicle Type</th>
                  <th>Vehicle No</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.slotNumber}</td>
                    <td>{booking.vehicleType}</td>
                    <td>{booking.vehicleNo}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.duration}</td>
                    <td
                      className={
                        booking.status === "Cancelled"
                          ? "status-cancelled"
                          : "status-confirmed"
                      }
                    >
                      {booking.status || "Confirmed"}
                    </td>
                    <td>
                      {booking.status !== "Cancelled" && (
                        <button
                          className="cancel-btn"
                          onClick={() => cancelBooking(index)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bottom-nav">
          <button className="back-btn" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingHistoryPage;
