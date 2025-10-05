import React, { useState } from "react";
import api from "../api/axiosConfig";

export default function OtpVerify({ mobile }) {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      const res = await api.post("/auth/verify-otp", { mobile, otp });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      window.location.href = "/profile";
    } catch (err) {
      console.error(err);
      alert("Invalid or expired OTP");
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify OTP</h2>
      <p>OTP sent to: {mobile}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
}
