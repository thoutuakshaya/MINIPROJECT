import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import Expert from '../models/Expert.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// ✅ Register new expert
router.post('/', protect, async (req, res) => {
  try {
    const {
      name,
      expertise,
      bio,
      skills,
      priceRange,
      location,
      availability,
      photo
    } = req.body;

    if (!name || !expertise) {
      return res.status(400).json({ message: 'Name and expertise are required' });
    }

    const expert = new Expert({
      name,
      expertise,
      bio,
      skills,
      priceRange,
      location,
      availability,
      photo,
      createdBy: req.user._id
    });

    const savedExpert = await expert.save();
    res.status(201).json(savedExpert);
  } catch (err) {
    console.error('Error creating expert:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get all experts (public)
router.get('/all', async (req, res) => {
  try {
    const experts = await Expert.find().sort({ createdAt: -1 });
    // console.log(experts);
    res.json(experts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get logged-in user's services
router.get('/myservices', protect, async (req, res) => {
  try {
    const myServices = await Expert.find({ createdBy: req.user._id });
    res.json(myServices);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Delete expert service
router.delete('/:id', protect, async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    if (expert.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this service' });
    }

    await expert.deleteOne();
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Update expert service
router.put('/:id', protect, async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    if (expert.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this service' });
    }

    Object.assign(expert, req.body);
    const updatedExpert = await expert.save();
    res.json(updatedExpert);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Calculate earnings from bookings
router.get('/earnings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      vendor: req.user._id,
      status: 'accepted'
    });

    const total = bookings.reduce((acc, booking) => acc + (booking.price || 1000), 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Dummy reviews count (to replace with actual logic)
router.get('/reviews', protect, async (req, res) => {
  try {
    res.json({ count: 12 }); // Replace with actual review count logic
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Admin-only: Update expert status
router.put('/admin/update/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can update expert status' });
    }

    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }

    expert.status = req.body.status || 'pending';
    await expert.save();

    res.json({ message: `Expert status updated to ${expert.status}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
