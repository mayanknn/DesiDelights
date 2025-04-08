const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require('nodemailer');

// Basic configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'desidelights32@gmail.com',
    pass: 'sbqo rgzj sjbw fsua'
  }
});

// Verify email connection
transporter.verify()
  .then(() => console.log('Email server ready'))
  .catch(err => console.error('Email server error:', err));

// Invoice email endpoint
app.post('/api/send-invoice-email', async (req, res) => {
  try {
    const { email, invoiceUrl } = req.body;
    
    if (!email || !invoiceUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await transporter.sendMail({
      from: 'desidelights32@gmail.com',
      to: email,
      subject: 'Your Invoice from Desi Delights',
      html: `<p>Thank you for your order! Download your invoice: <a href="${invoiceUrl}">here</a></p>`
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Error handling
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})
.on('error', err => {
  console.error('Server error:', err);
});