import React, { useState } from "react";
import api from "../api/axiosConfig";
import OtpVerify from "./OtpVerify";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      await api.post("/auth/send-otp", { mobile });
      alert("OTP sent successfully!");
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  if (otpSent) return <OtpVerify mobile={mobile} />;

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter mobile number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
}
