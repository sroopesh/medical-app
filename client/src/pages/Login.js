// src/pages/Login.js
import React, { useState } from "react";
import api from "../api/axiosConfig";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const res = await api.post("/auth/send-otp", { mobile });
      alert(res.data.message);
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await api.post("/auth/verify-otp", { mobile, otp });
      localStorage.setItem("token", res.data.token); // ✅ store JWT token
      alert("Login successful!");
      window.location.href = "/profile"; // redirect to profile page
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login with Mobile OTP</h2>
      <input
        type="text"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      {!otpSent && (
        <button onClick={handleSendOtp} style={{ marginLeft: "10px" }}>
          Send OTP
        </button>
      )}

      {otpSent && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp} style={{ marginLeft: "10px" }}>
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
