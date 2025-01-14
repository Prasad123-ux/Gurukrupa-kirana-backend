const otpGenerator = require("otp-generator");
const { validationResult } = require("express-validator");
const twilio = require("twilio");
require("dotenv").config();

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// In-memory OTP store
const otpMemoryStore = new Map();
const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

const generateOTPController = async (req, res) => {
  const { mobile_number } = req.body.userInfo; // Correctly access mobile_number

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: "Validation errors",
      errors: errors.array(),
    });
  }

  // Generate OTP
  const otp = otpGenerator.generate(4, { upperCase: false, specialChars: false });

  try {
    // Save OTP to memory with expiration
    otpMemoryStore.set(mobile_number, { otp, expiresAt: Date.now() + OTP_EXPIRATION_TIME });

    // Schedule OTP removal after expiration
    setTimeout(() => {
      otpMemoryStore.delete(mobile_number);
    }, OTP_EXPIRATION_TIME);

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP for Gurukrupa Kirana is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile_number,
    });

    res.status(200).json({
      status: true,
      message: "OTP sent successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error sending OTP.",
      error: err.message,
    });
  }
};

module.exports = { generateOTPController };
