import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SettingsPage.css";

function SettingsPage() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) ?? true
  );

  const handleSaveSettings = () => {
    localStorage.setItem("notifications", notifications);
    alert("Settings saved!");
  };

  const handleChangePassword = async () => {
    const oldPassword = prompt("Enter your current password:");
    if (!oldPassword) return;

    const newPassword = prompt("Enter your new password:");
    if (!newPassword) return;

    try {
      const userId = localStorage.getItem("userId");
      await axios.post(`/api/change-password`, {
        userId,
        oldPassword,
        newPassword
      });
      alert("Password updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Old password is incorrect or update failed!");
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={() => navigate("/settings")}>Settings</button>
        <button onClick={() => navigate("/about")}>About</button>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="settings-main">
        <h1>Settings</h1>

        <div className="settings-card">
          <h2>Account Settings</h2>
          <p>Change your password or manage account info.</p>
          <button className="settings-btn" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>

        <div className="settings-card">
          <h2>Notifications</h2>
          <p>Enable or disable notifications for your account.</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="settings-buttons">
          <button className="settings-btn" onClick={handleSaveSettings}>
            Save Settings
          </button>

          <button className="back-btn" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
