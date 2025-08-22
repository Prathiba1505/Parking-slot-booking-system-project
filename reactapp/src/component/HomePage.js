import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [faqs, setFaqs] = useState([]);
  const currentUser = localStorage.getItem("userId") || "guest";

  const menuItems = [
    { name: "Home", route: "/home" },
    { name: "Profile", route: "/profile" },
    { name: "Settings", route: "/settings" },
    { name: "About", route: "/about" },
    { name: "Logout", route: "/" }
  ];

  useEffect(() => {
    const savedFaqs = localStorage.getItem("faqs");
    if (savedFaqs) setFaqs(JSON.parse(savedFaqs));

    const handleStorageChange = () => {
      const updatedFaqs = localStorage.getItem("faqs");
      if (updatedFaqs) setFaqs(JSON.parse(updatedFaqs));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios.get(`/api/booking-history`)
      .then(res => {
        const userHistory = res.data.filter(h => h.changedBy?.id == userId);
        setBookingHistory(userHistory);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching booking history:", err);
        setLoading(false);
      });
  }, []);

  const handleSubmitFaq = (e) => {
    e.preventDefault();
    const question = e.target.question.value.trim();
    if (!question) return;

    const newFaq = {
      id: Date.now(),
      userId: currentUser,
      question,
      reply: "Waiting for admin reply..."
    };

    const updatedFaqs = [...faqs, newFaq];
    setFaqs(updatedFaqs);
    localStorage.setItem("faqs", JSON.stringify(updatedFaqs));
    e.target.reset();
  };

  const userFaqs = faqs.filter(f => f.userId === currentUser);

  return (
    <div className="homepage-container">
      <aside className="sidebar">
        <div className="sidebar-logo">Parking System</div>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="sidebar-btn"
            onClick={() => {
              if (item.name === "Logout") localStorage.removeItem("userId");
              navigate(item.route);
            }}
          >
            {item.name}
          </button>
        ))}
      </aside>

      <main className="main-content">
        <div className="main-wrapper">
          <div className="content-wrapper">
            <section className="hero-section">
              <h1>Welcome to Parking Slot System</h1>
              <p>Manage your bookings, view facilities, and update your profile all in one place.</p>
              <button className="start-btn" onClick={() => navigate("/booking")}>
                Start Booking
              </button>
            </section>

            <section className="dashboard-cards">
              <div className="card">
                <h2>Booking History</h2>
                {loading ? (
                  <p>Loading history...</p>
                ) : bookingHistory.length === 0 ? (
                  <p>No bookings found.</p>
                ) : (
                  <ul>
                    {bookingHistory.slice(0, 5).map(history => (
                      <li key={history.historyId}>
                        <strong>{history.booking?.slotName || "Slot"}:</strong> {history.statusChange} on {new Date(history.changeDate).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => navigate("/booking-history")}>View Full History</button>
              </div>

              <div className="card">
                <h2>Facilities Details</h2>
                <p>Check available parking facilities, capacity, and other details.</p>
                <button onClick={() => navigate("/facilities")}>View Facilities</button>
              </div>

              <div className="card">
                <h2>Profile</h2>
                <p>Update your personal information and preferences.</p>
                <button onClick={() => navigate("/profile")}>Go to Profile</button>
              </div>
            </section>
          </div>
          <aside className="faq-sidebar">
            <h2>Ask a Question</h2>
            <form onSubmit={handleSubmitFaq}>
              <input type="text" name="question" placeholder="Type your question..." required />
              <button type="submit">Submit</button>
            </form>

            <h3>My Questions</h3>
            {userFaqs.length === 0 ? (
              <p>No questions submitted yet.</p>
            ) : (
              <ul>
                {userFaqs.map(faq => (
                  <li key={faq.id}>
                    <strong>Q:</strong> {faq.question}<br />
                    <span className="reply"><strong>Reply:</strong> {faq.reply}</span>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
