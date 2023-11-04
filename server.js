const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(express.json());

// Set up CORS with your frontend's origin
app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your frontend's origin
  })
);

// Use Helmet middleware to enhance security
app.use(helmet());

// Configure Content Security Policy (CSP) to restrict resource sources
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      scriptSrc: ["'self'", "trusted-scripts.com"], // Add trusted script sources
      frameAncestors: "none",
    },
  })
);

// Set up secure session management
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

// Middleware to check if the user is authenticated
function authenticate(req, res, next) {
  if (req.session.user) {
    // User is authenticated
    next();
  } else {
    // Redirect or send an error response
    res.status(401).send("Unauthorized");
  }
}

// Define a route that requires authentication to access sensitive data
app.get("/sensitive-data", authenticate, (req, res) => {
  // Return sensitive data
  res.json({ sensitiveData: "This is sensitive information." });
});

// Implement rate limiting and other security headers
app.use(helmet());

// Define a route for sending emails
app.post("/send-email", async (req, res) => {
  const { to, subject, body } = req.body;

  // Create a Nodemailer transporter using your email service's credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use the appropriate email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address stored in environment variables
      pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password stored in environment variables
    },
    debug: true,
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to,
    subject,
    text: body,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "An error occurred while sending the email" });
  }
});

const PORT = process.env.PORT || 3005; // Use the specified port or 3005 as a default
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
