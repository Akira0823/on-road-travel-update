const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const apiRoutes = require('./routes/api');
const contactRoutes = require('./routes/contact');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/onroad_travel');
    console.log(`🗄️  MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// MongoDB Schemas
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  interest: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    default: 'General Inquiry',
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  }
}, {
  timestamps: true
});

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  destination: {
    type: String,
    required: true
  },
  packageName: String,
  travelDate: Date,
  travelers: {
    type: Number,
    default: 1
  },
  budget: Number,
  specialRequests: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const adminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager'],
    default: 'manager'
  }
}, {
  timestamps: true
});

const websiteAnalyticsSchema = new mongoose.Schema({
  pageVisited: String,
  visitorIp: String,
  userAgent: String,
  referrer: String,
  visitDate: {
    type: Date,
    default: Date.now
  }
});

// Create Models
const Customer = mongoose.model('Customer', customerSchema);
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const AdminUser = mongoose.model('AdminUser', adminUserSchema);
const WebsiteAnalytics = mongoose.model('WebsiteAnalytics', websiteAnalyticsSchema);

const EmailService = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'recipient@example.com',
        subject: 'Hello!',
        message: 'This is a test email from OnRoad Travel',
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Email sent successfully!');
    } else {
      alert('Email failed to send.');
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred while sending email.');
  }
};

// Email transport setup
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test email connection when server starts
const testEmailConnection = async () => {
  try {
    await emailTransporter.verify();
    console.log('✅ Email service connected successfully!');
  } catch (error) {
    console.error('❌ Email service failed:', error.message);
    console.log('Check your EMAIL_USER and EMAIL_PASSWORD in .env file');
  }
};

// Initialize services
testEmailConnection();

// Middleware to track page visits
app.use('/api', (req, res, next) => {
  // Track API calls for analytics 
  const logVisit = async () => {
    try {
      const analytics = new WebsiteAnalytics({
        pageVisited: req.path,
        visitorIp: req.ip,
        userAgent: req.get('User-Agent'),
        referrer: req.get('Referrer') || 'Direct'
      });
      await analytics.save();
    } catch (error) {
      console.error('Analytics logging error:', error);
    }
  };
  logVisit();
  next();
});

// Root route
app.use('/api', apiRoutes);
app.use('/', contactRoutes);
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'On Road Travel API is running!',
    version: '1.0.0',
    database: 'MongoDB',
    endpoints: {
      health: '/api/health',
      subscribe: '/api/subscribe',
      contact: '/api/contact',
      booking: '/api/booking'
    }
  });
});

// API Routes

// 1. Newsletter Subscription / Customer Registration
app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email, phone, interest, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required' 
      });
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already subscribed' 
      });
    }

    // Create new customer
    const customer = new Customer({
      name,
      email,
      phone: phone || null,
      interest: interest || null,
      message: message || null
    });

    await customer.save();

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to On Road Travel!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">Welcome to On Road Travel, ${name}!</h2>
          <p>Thank you for subscribing to our newsletter. We're excited to help you plan your next adventure!</p>
          <p>Here's what you can expect:</p>
          <ul>
            <li>Exclusive travel deals and discounts</li>
            <li>Travel tips and destination guides</li>
            <li>Personalized itinerary recommendations</li>
          </ul>
          <p>Our travel experts will contact you soon to discuss your travel preferences.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Information:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${interest ? `<p><strong>Interest:</strong> ${interest}</p>` : ''}
          </div>
          <p>Best regards,<br>On Road Travel Team</p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);

    // Send notification to admin
    const adminNotification = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'New Newsletter Subscription - On Road Travel',
      html: `
        <h3>New Customer Subscription</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
        <p><strong>Message:</strong> ${message || 'No message'}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    await emailTransporter.sendMail(adminNotification);

    res.json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process subscription. Please try again.' 
    });
  }
});

// 2. Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, phone and message are required' 
      });
    }

    // Create contact message
    const contactMessage = new ContactMessage({
      name,
      email,
      phone: phone || null,
      subject: subject || 'General Inquiry',
      message
    });

    await contactMessage.save();

    // Send confirmation email to customer
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting On Road Travel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">Thank you for reaching out, ${name}!</h2>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Message:</h3>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          <p>Best regards,<br>On Road Travel Team</p>
          <p style="color: #666; font-size: 12px;">Phone: +91-8580410699 | Email: info@onroadtravel.com</p>
        </div>
      `
    };

    await emailTransporter.sendMail(customerEmail);

    // Send notification to admin
    const adminNotification = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Message: ${subject || 'General Inquiry'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>Please respond to this inquiry promptly.</p>
      `
    };

    await emailTransporter.sendMail(adminNotification);

    res.json({ 
      success: true, 
      message: 'Message sent successfully! We will contact you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
});

// 3. Booking Request
app.post('/api/booking', async (req, res) => {
  try {
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      destination, 
      packageName, 
      travelDate, 
      travelers, 
      budget, 
      specialRequests 
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !destination) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, phone and destination are required' 
      });
    }

    // First, ensure customer exists
    let customer = await Customer.findOne({ email: customerEmail });

    if (!customer) {
      // Create new customer
      customer = new Customer({
        name: customerName,
        email: customerEmail,
        phone: customerPhone
      });
      await customer.save();
    }

    // Create booking
    const booking = new Booking({
      customerId: customer._id,
      customerName,
      customerEmail,
      customerPhone,
      destination,
      packageName: packageName || null,
      travelDate: travelDate || null,
      travelers: travelers || 1,
      budget: budget || null,
      specialRequests: specialRequests || null
    });

    await booking.save();

    // Send booking confirmation email
    const bookingEmail = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'Booking Request Received - On Road Travel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">Booking Request Received!</h2>
          <p>Dear ${customerName},</p>
          <p>Thank you for your booking request. We are processing your request and will contact you soon with a detailed itinerary and pricing.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Booking Details:</h3>
            <p><strong>Destination:</strong> ${destination}</p>
            ${packageName ? `<p><strong>Package:</strong> ${packageName}</p>` : ''}
            ${travelDate ? `<p><strong>Travel Date:</strong> ${travelDate}</p>` : ''}
            <p><strong>Number of Travelers:</strong> ${travelers || 1}</p>
            ${budget ? `<p><strong>Budget:</strong> ₹${budget}</p>` : ''}
            ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
          </div>
          
          <p>Our travel experts will contact you within 2-4 hours to discuss your requirements in detail.</p>
          <p>Best regards,<br>On Road Travel Team</p>
        </div>
      `
    };

    await emailTransporter.sendMail(bookingEmail);

    // Admin notification
    const adminNotification = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Booking Request - ${destination}`,
      html: `
        <h3>New Booking Request</h3>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${customerPhone || 'Not provided'}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Package:</strong> ${packageName || 'Custom'}</p>
        <p><strong>Travel Date:</strong> ${travelDate || 'Flexible'}</p>
        <p><strong>Travelers:</strong> ${travelers || 1}</p>
        <p><strong>Budget:</strong> ${budget ? `₹${budget}` : 'Not specified'}</p>
        <p><strong>Special Requests:</strong> ${specialRequests || 'None'}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><strong>Action Required:</strong> Contact customer within 2-4 hours</p>
      `
    };

    await emailTransporter.sendMail(adminNotification);

    res.json({ 
      success: true, 
      message: 'Booking request submitted successfully! We will contact you soon.' 
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process booking request. Please try again.' 
    });
  }
});

// 4. Get Dashboard Data (Admin)
app.get('/api/admin/dashboard', async (req, res) => {
  try {
    // Get customer count
    const customerCount = await Customer.countDocuments();
    
    // Get booking count
    const bookingCount = await Booking.countDocuments();
    
    // Get message count
    const messageCount = await ContactMessage.countDocuments({ status: 'new' });
    
    // Get recent activities
    const recentBookings = await Booking.find()
      .populate('customerId', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);
    
    const recentMessages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(10);

    // Get analytics data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyVisits = await WebsiteAnalytics.aggregate([
      {
        $match: {
          visitDate: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$visitDate" }
          },
          visits: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": -1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          customers: customerCount,
          bookings: bookingCount,
          newMessages: messageCount
        },
        recentBookings,
        recentMessages,
        analytics: dailyVisits.map(item => ({
          date: item._id,
          visits: item.visits
        }))
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to load dashboard data' 
    });
  }
});

// 5. Get All Customers (Admin)
app.get('/api/admin/customers', async (req, res) => {
  try {
    const customers = await Customer.aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'customerId',
          as: 'bookings'
        }
      },
      {
        $addFields: {
          total_bookings: { $size: '$bookings' },
          last_booking: { $max: '$bookings.createdAt' }
        }
      },
      {
        $project: {
          bookings: 0
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    res.json({ success: true, data: customers });
  } catch (error) {
    console.error('Customers fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch customers' 
    });
  }
});

// 6. Get All Messages (Admin)
app.get('/api/admin/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 });

    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('Messages fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch messages' 
    });
  }
});

// 7. Update Message Status (Admin)
app.put('/api/admin/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await ContactMessage.findByIdAndUpdate(id, { status });

    res.json({ success: true, message: 'Message status updated' });
  } catch (error) {
    console.error('Message update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update message status' 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'On Road Travel API is running with MongoDB!',
    database: 'MongoDB',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 On Road Travel API Server running on port ${PORT}`);
  console.log(`📧 Email service configured`);
  console.log(`🗄️  MongoDB connection established`);
});

module.exports = app;