import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutPage.css";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-sidebar">
        <h2>Menu</h2>
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={() => navigate("/settings")}>Settings</button>
        <button onClick={() => navigate("/about")}>About</button>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      <div className="about-main">
        <h1>About Our Parking Slot Management System</h1>

        <section className="about-section">
          <h2>System Overview</h2>
          <p>
            The Parking Slot Management System is a comprehensive platform designed to streamline the
            process of booking and managing parking slots for both users and administrators.
            Users can effortlessly reserve parking slots, track their booking history, and manage
            personal profiles. Administrators can monitor slot availability, manage bookings, and
            optimize overall parking efficiency.
          </p>
        </section>

        <section className="about-section">
          <h2>Objectives</h2>
          <ul>
            <li>Reduce time spent searching for parking slots.</li>
            <li>Provide a user-friendly platform for booking and managing parking.</li>
            <li>Enable administrators to efficiently monitor and control parking resources.</li>
            <li>Ensure secure login and role-based access control for users and admins.</li>
            <li>Improve overall parking management efficiency within organizations or public areas.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <ul>
            <li>Online booking of parking slots with real-time availability.</li>
            <li>View and manage booking history.</li>
            <li>User profile management including settings and notifications.</li>
            <li>Administrator dashboard to oversee all bookings and manage slots.</li>
            <li>Secure authentication and role-based access for users and admins.</li>
            <li>Email notifications for booking confirmations and updates.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Technologies Used</h2>
          <ul>
            <li>Frontend: React.js with React Router for navigation</li>
            <li>Backend: Spring Boot REST APIs</li>
            <li>Database: MySQL / PostgreSQL for user and booking data</li>
            <li>Authentication: JWT-based login</li>
            <li>Email Service: SMTP integration for notifications</li>
            <li>Version Control: Git for source code management</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Benefits</h2>
          <ul>
            <li>Saves users time by providing quick access to available parking slots.</li>
            <li>Reduces parking congestion with better slot allocation.</li>
            <li>Improves administrative control over parking resources.</li>
            <li>Enhances security with role-based access control and verified accounts.</li>
            <li>Provides automated notifications and reminders for bookings.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            To create a reliable, efficient, and user-friendly parking management system that
            enhances the overall parking experience, reduces operational challenges, and maximizes
            the utilization of parking resources.
          </p>
        </section>

        <button className="back-btn" onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
