// routes/adminRoutes.js
import express from 'express';
import User from '../models/User.js';
import Expert from '../models/Expert.js';
import Booking from '../models/Booking.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Summary data
router.get('/summary', protect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVendors = await Expert.countDocuments();
    const totalBookings = await Booking.countDocuments();
    res.json({ totalUsers, totalVendors, totalBookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
router.get('/users', protect, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Block/Unblock user
router.put('/users/:id/block', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.blocked = !user.blocked;
    await user.save();
    res.json({ message: `User ${user.blocked ? 'blocked' : 'unblocked'} successfully.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user
router.delete('/users/:id', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all profiles (except admin)
router.get('/profiles', protect, async (req, res) => {
  try {
    const profiles = await User.find({ role: { $ne: 'admin' } }).select('-password');
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve profile
router.put('/profiles/:id/approve', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profileStatus = 'approved';
    await user.save();
    res.json({ message: 'Profile approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject profile
router.put('/profiles/:id/reject', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profileStatus = 'rejected';
    await user.save();
    res.json({ message: 'Profile rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
