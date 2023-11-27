// UserProfile.js

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // Handle case where user data doesn't exist in localStorage
      // Redirect to login or handle this scenario appropriately
    }
  }, []);

  if (!user) {
    return (
      <div>
        <Navbar />
        <div>Login to continue</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="user-profile" style={{ background: "#6e43c4", color: "#fff", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="user-card" style={{ maxWidth: "400px", width: "100%", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", background: "#fff", height: "300px" }}>
          <h1 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px", color: "#000" }}>User Profile</h1>
          <br></br>
          <div className="card-details" style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", color: "#000" }}>
            <span className="user-label" style={{ fontWeight: "bold" }}>NAME:</span>
            <span className="user-value">{user.userName}</span>
          </div>
          <div className="card-details" style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", color: "#000" }}>
            <span className="user-label" style={{ fontWeight: "bold" }}>EMAIL:</span>
            <span className="user-value">{user.email}</span>
          </div>
          <div className="card-details" style={{ display: "flex", justifyContent: "space-between", color: "#000" }}>
            <span className="user-label" style={{ fontWeight: "bold" }}>PHONE:</span>
            <span className="user-value">{user.contactNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
