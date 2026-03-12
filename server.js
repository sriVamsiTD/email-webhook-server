// Import required libraries
const express = require("express");
const nodemailer = require("nodemailer");

// Create Express app
const app = express();

// Allow server to read JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------
// Test route
// -----------------------------
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// -----------------------------
// Email configuration
// -----------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "pentakotasri204@gmail.com",
    pass: "jyrg tsnn irml udxo"
  },
  connectionTimeout: 20000
});

// -----------------------------
// Webhook endpoint
// -----------------------------
app.post("/webhook", async (req, res) => {
  try {

    console.log("Webhook triggered");
    console.log("Incoming data:", req.body);

    const formData = req.body;

    const email =
      formData.email ||
      formData.Email ||
      formData.userEmail ||
      formData["E-mail"];

    let message = "New Lead Received\n\n";

    for (const key in formData) {
      message += `${key}: ${formData[key]}\n`;
    }

    const mailOptions = {
      from: "pentakotasri204@gmail.com",
      to: "b.jayanthreddy31@gmail.com",
      replyTo: email,
      subject: "New Form Submission",
      text: message
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully ✅");

    res.status(200).json({
      message: "Email sent successfully"
    });

  } catch (error) {

    console.error("Error sending email ❌", error);

    res.status(500).json({
      message: "Error sending email",
      error: error.message
    });
  }
});

// -----------------------------
// Start server
// -----------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});