import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:8081/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Unable to load profile.");
        setLoading(false);
      });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch(`http://localhost:8081/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((updated) => {
        setUser(updated);
        setEditMode(false);
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile");
      });
  };

  if (loading) return <div className="profile-container">Loading...</div>;
  if (error) return <div className="profile-container error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <h2>Your Profile</h2>
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
      <div className="profile-main">
        <h1>Profile</h1>
        <div className="profile-card">
          {editMode ? (
            <>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="profile-row"><span>ID:</span> {user.userId}</div>
              <div className="profile-row"><span>Username:</span> {user.username}</div>
              <div className="profile-row"><span>First Name:</span> {user.firstName}</div>
              <div className="profile-row"><span>Last Name:</span> {user.lastName}</div>
              <div className="profile-row"><span>Email:</span> {user.email}</div>
              <div className="profile-row"><span>Phone:</span> {user.phone || "N/A"}</div>
              <div className="profile-row"><span>Role:</span> {user.role}</div>
              <div className="profile-actions">
                <button className="edit-btn" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
