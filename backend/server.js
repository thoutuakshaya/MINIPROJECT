import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route Imports
import userRoutes from './routes/userRoutes.js'; 
import eventRoutes from './routes/eventRoutes.js';
import expertRoutes from './routes/expertRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import attendeeRoutes from './routes/attendeeRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import uploadRoutes from './routes/upload.js'; 
import registrationRoutes from './routes/Registrationroutes.js'; // ✅ Correct import path

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/attendee', attendeeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/registrations', registrationRoutes); // ✅ Your new route
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Tech Event Management API is running...');
});

// Optional: Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
