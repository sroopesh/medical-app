import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const requestOtp = async () => {
    await api.post("/auth/send-otp", { phone });
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await api.post("/auth/verify-otp", { phone, otp });
    localStorage.setItem("token", res.data.token);
    alert("Login successful!");
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <input type="text" placeholder="Enter phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <button onClick={requestOtp}>Send OTP</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}
