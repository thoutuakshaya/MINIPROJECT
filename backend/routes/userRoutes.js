import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// ✅ Public Routes
router.post('/register', registerUser);
router.post('/login', authUser);

// ✅ Protected Routes

// Get own profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/me
router.get("/me", protect, (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not logged in" });
  res.json(req.user);
});


// Update own profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, phone, bio, photo } = req.body;
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (photo) user.photo = photo;

    await user.save();
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Admin-only Routes

// Get all users (organizers, experts, attendees)
router.get('/admin/users', protect, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user
router.delete('/admin/users/:id', protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Block or unblock a user
router.put('/admin/users/:id/block', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.blocked = !user.blocked;
    await user.save();
    res.json({ message: `User ${user.blocked ? 'blocked' : 'unblocked'}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Public Route: Get all users with role 'expert' (for expert listing page)
router.get('/experts/all', async (req, res) => {
  try {
    const experts = await User.find({ role: 'expert' }).select('-password');
    res.json(experts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
