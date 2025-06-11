import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public: Submit contact message
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  const msg = new ContactMessage({ name, email, subject, message });
  await msg.save();

  res.status(201).json({ message: "Message sent successfully!" });
});

// Admin-only: Get all contact messages
router.get('/admin/messages', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

export default router;
