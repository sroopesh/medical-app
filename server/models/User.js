const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  otp: String,
  otpExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
