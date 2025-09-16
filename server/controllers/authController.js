import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { sendOTP } from "../utils/otpService.js";

export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await sendOTP(phone, otp); // external SMS service

  let user = await User.findOne({ phone });
  if (!user) user = new User({ phone });
  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 min expiry
  await user.save();

  res.json({ message: "OTP sent!" });
};

export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};
