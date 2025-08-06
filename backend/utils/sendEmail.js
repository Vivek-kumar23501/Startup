const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * Sends an email using Gmail and nodemailer.
 *
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 */
const sendEmail = async (to, subject, html) => {
  try {
    // ✅ Create reusable transporter object
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use app password
      },
    });

    // ✅ Email details
    const mailOptions = {
      from: `"Startup Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // ✅ Send mail
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
