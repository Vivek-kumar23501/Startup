const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// ✅ REGISTER
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
    const html = `
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
    `;

    await sendEmail(email, "Verify your Email", html);
    res.status(200).json({ message: "Verification email sent." });

  } catch (err) {
    console.error("❌ Register Error:", err.message);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// ✅ VERIFY EMAIL
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
      return res.redirect(`http://localhost:5173/${user.role}-dashboard?verified=already`);
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    return res.redirect(`http://localhost:5173/${user.role}-dashboard?verified=success`);
  } catch (err) {
    console.error("❌ Verification Error:", err.message);
    return res.send(`
      <div style="font-family: Arial; text-align: center; padding: 40px;">
        <h2 style="color: red;">❌ Invalid or expired token.</h2>
      </div>
    `);
  }
});

// ✅ LOGIN
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

// ✅ MAGIC LOGIN (SEND EMAIL)
router.post("/magic-login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found." });

    if (!user.isVerified)
      return res.status(403).json({ message: "Email not verified." });

    const token = jwt.sign(
      { email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    const magicLink = `http://localhost:5000/api/auth/magic-login/${token}`;

    const html = `
      <h2>Hello ${user.name},</h2>
      <p>Click the button below to login without a password. This link will expire in 15 minutes.</p>
      <a href="${magicLink}" style="
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      ">Login Now</a>
    `;

    await sendEmail(user.email, "Magic Login Link", html);
    res.status(200).json({ message: "Magic login link sent to your email." });

  } catch (err) {
    console.error("❌ Magic Login Error:", err.message);
    res.status(500).json({ message: "Server error." });
  }
});

// ✅ MAGIC LOGIN REDIRECT
router.get("/magic-login/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user)
      return res.status(404).send("<h2>User not found.</h2>");

    const redirectUrl = `http://localhost:5173/${user.role}-dashboard?magic=success&name=${user.name}`;
    res.redirect(redirectUrl);

  } catch (err) {
    console.error("❌ Magic Login Token Error:", err.message);
    res.send("<h2 style='color: red;'>Invalid or expired login link.</h2>");
  }
});

module.exports = router;
