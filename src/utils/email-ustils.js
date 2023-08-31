const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Your email service configuration here
});

// Function to send an email
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'lunanpseudocode@gmail.com',
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmail,
};