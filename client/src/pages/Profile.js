import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", gender: "", address: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setProfile(res.data);
      setForm(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await api.post("/profile", form);
      alert(res.data.message);
      setProfile(res.data.profile);
    } catch (err) {
      alert("Failed to save profile");
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      <input
        placeholder="Gender"
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      />
      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
