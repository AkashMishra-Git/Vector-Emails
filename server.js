import dotenv from "dotenv";
dotenv.config();
// Load environment variables
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable
    pass: process.env.EMAIL_PASS, // Use environment variable
  },
});

app.post("/send-query", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ success: false, message: "Query is required." });
  }

  try {
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL, // Your email
      to: process.env.RECIEVE_EMAIL, // Admin email
      subject: "Vector - New Support Query",
      text: `New Query Submitted: ${query}`,
    });

    res.json({ success: true, message: "Query submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send query." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
