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
// Webhook endpoint
// -----------------------------
app.post("/webhook", async (req, res) => {
  try {

    console.log("Webhook triggered");
    console.log("Incoming data:", req.body);

    // req.body contains all form fields sent by Framer
    const formData = req.body;

    // Convert all fields into readable email text

    const email =
      formData.email ||
      formData.Email ||
      formData.userEmail ||
      formData["E-mail"];

    let message = "New Lead Received\n\n";

    for (const key in formData) {
      message += `${key}: ${formData[key]}\n`;
    }


    // -----------------------------
    // Email configuration
    // -----------------------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pentakotasri204@gmail.com",
        pass: "jyrg tsnn irml udxo"
      }
    });


    // -----------------------------
    // Email content
    // -----------------------------
    const mailOptions = {
      from: "pentakotasri204@gmail.com",
      to: "b.jayanthreddy31@gmail.com",
      replyTo: email,
      subject: "New Form Submission",
      text: message
    };


    // Send email
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

// OLD CODE (kept for reference)
// app.listen(3000, () => {
//   console.log("Webhook server running at http://localhost:3000");
// });


// NEW CODE (required for Render deployment)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});