const express = require("express");
const helmet = require('helmet');
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your frontend's origin
  })
);

app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      'frame-ancestors': "'none'",
    }
  })
);

app.use((res, next) => {
  res.header('X-Frame-Options', 'SAMEORIGIN');
  next();
});

app.disable('x-powered-by');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Middleware to check if the user is authenticated
function authenticate(req, res, next) {
  if (req.session.user) {
    // User is authenticated
    next();
  } else {
    // Redirect or send an error response
    res.status(401).send('Unauthorized');
  }
}

// Define a route that requires authentication to access sensitive data
app.get('/sensitive-data', authenticate, (req, res) => {
  // Return sensitive data
  res.json({ sensitiveData: 'This is sensitive information.' });
});

app.use(cors({
  origin: 'https://bloomfields-lunan.com/',
  methods: 'GET,POST',
}));

// Define a route for sending emails
app.post("/send-email", async (req, res) => {
  const { to, subject, body } = req.body;

  // Create a Nodemailer transporter using your email service's credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use the appropriate email service
    auth: {
      user: "lunanpseudocode@gmail.com", // Your email address
      pass: "ahu kbe apm nbu euji", // Your email password or app-specific password
    },
    debug: true,
  });

  // Email options
  const mailOptions = {
    from: "lunanpseudocode@gmail.com", // Sender's email address
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
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
