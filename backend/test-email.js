const sendEmail = require("./utils/sendEmail");

sendEmail("your-email@gmail.com", "Test Email", "<p>This is a test</p>")
  .then(() => console.log("✅ Test email sent"))
  .catch((err) => console.error("❌ Email failed:", err));
