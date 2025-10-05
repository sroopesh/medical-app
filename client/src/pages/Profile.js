// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        alert("Please login again");
        window.location.href = "/";
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 My Profile</h2>

        <div style={styles.row}>
          <strong>Name:</strong>
          <span>{profile.name || "Not provided"}</span>
        </div>
        <div style={styles.row}>
          <strong>Mobile:</strong>
          <span>{profile.mobile}</span>
        </div>
        <div style={styles.row}>
          <strong>Age:</strong>
          <span>{profile.age || "Not provided"}</span>
        </div>
        <div style={styles.row}>
          <strong>Gender:</strong>
          <span>{profile.gender || "Not provided"}</span>
        </div>
        <div style={styles.row}>
          <strong>Address:</strong>
          <span>{profile.address || "Not provided"}</span>
        </div>

        <button
          style={styles.button}
          onClick={() => (window.location.href = "/edit-profile")}
        >
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
};

// Simple CSS-in-JS styling
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f6fa",
  },
  card: {
    background: "#fff",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    width: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "16px",
  },
  button: {
    marginTop: "20px",
    width: "100%",
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Profile;
