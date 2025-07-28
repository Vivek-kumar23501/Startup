const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// DEBUG only (remove in production)
console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🔑 EMAIL_PASS length:", process.env.EMAIL_PASS?.length || "MISSING");

// ✅ Create transporter with credentials
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// ✅ REGISTER ROUTE
router.post("/register", async (req, res) => {
  const { name, email, rollNumber, registrationNumber, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    const newUser = new User({
      name,
      email,
      rollNumber,
      registrationNumber,
      password: hashedPassword,
      role,
      isVerified: false,
      verificationToken: token,
    });

    await newUser.save();

    const verifyLink = `http://localhost:5000/api/auth/verify/${token}`;
    const mailOptions = {
      from: `"Startup App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your Email",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for registering. Please verify your email by clicking the button below:</p>
          <a href="${verifyLink}" style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #28a745;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 10px;
          ">Verify Email</a>
          <p style="margin-top: 20px;">This link will expire in 1 hour.</p>
        </div>
      `,
    };

    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification email sent." });
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// ✅ VERIFY ROUTE
router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email, verificationToken: token });

    if (!user) {
      return res.send(`
        <div style="font-family: Arial; text-align: center; padding: 40px;">
          <h2 style="color: red;">❌ Invalid or expired verification link.</h2>
        </div>
      `);
    }

    if (user.isVerified) {
      return res.send(`
        <div style="font-family: Arial; text-align: center; padding: 40px;">
          <h2 style="color: orange;">⚠️ Email already verified.</h2>
          <a href="http://localhost:5173/login" style="
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 10px;
          ">Go to Login</a>
        </div>
      `);
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.send(`
      <div style="font-family: Arial; text-align: center; padding: 40px;">
        <h2 style="color: green;">✅ Email verified successfully!</h2>
        <p>You can now login below:</p>
        <a href="http://localhost:5173/login" style="
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          margin-top: 10px;
        ">Go to Login</a>
      </div>
    `);
  } catch (err) {
    console.error("❌ Verification Error:", err.message);
    return res.send(`
      <div style="font-family: Arial; text-align: center; padding: 40px;">
        <h2 style="color: red;">❌ Invalid or expired token.</h2>
      </div>
    `);
  }
});

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your email before logging in." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    res.status(200).json({
      message: "Login successful.",
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;
