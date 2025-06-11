import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Allowed statuses for bookings
const allowedStatuses = ['pending', 'accepted', 'rejected', 'cancelled'];

// Create a new booking by organizer
router.post("/", protect, async (req, res) => {
  try {
    const { expertId, eventDate, message } = req.body;

    if (!expertId || !eventDate) {
      return res.status(400).json({
        message: "Both 'expertId' and 'eventDate' are required.",
      });
    }

    const newBooking = new Booking({
      organizer: req.user._id,
      expert: expertId,
      eventDate: new Date(eventDate),
      message: message?.trim() || "",
      status: "pending", // set default status
    });

    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);

  } catch (err) {
    console.error("❌ Booking creation error:", err.message || err);
    res.status(500).json({ message: "Internal server error while creating booking." });
  }
});

// GET /api/bookings/expert?expertId=abc123
router.get("/expert", async (req, res) => {
  const { expertId } = req.query;

  if (!expertId) {
    return res.status(400).json({ message: "Expert ID is required" });
  }

  try {
    const bookings = await Booking.find({ expert: expertId })
      .populate("organizer", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Error fetching bookings by expert ID:", err.message || err);
    res.status(500).json({ message: "Server error fetching bookings." });
  }
});


// Get bookings for logged-in organizer
router.get('/organizer', protect, async (req, res) => {
  try {
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const bookings = await Booking.find({ organizer: req.user._id })
      .populate('expert', 'name category location')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching organizer bookings:", err.message || err);
    res.status(500).json({ message: "Server error fetching organizer bookings." });
  }
});

// Admin-only: Get all bookings
router.get('/admin/all', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bookings = await Booking.find()
      .populate('expert', 'name category location')
      .populate('organizer', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching all bookings for admin:", err.message || err);
    res.status(500).json({ message: "Server error fetching all bookings." });
  }
});


// Organizer cancels a booking
router.put('/cancel/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    booking.status = 'cancelled';
    booking.cancelledBy = 'organizer'; // make sure this field exists in your schema
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (err) {
    console.error("❌ Error cancelling booking:", err.message || err);
    res.status(500).json({ message: "Server error cancelling booking." });
  }
});
// PUT /api/bookings/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (err) {
    console.error("Error updating booking status:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Admin deletes a booking
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     const booking = await Booking.findByIdAndDelete(req.params.id);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     res.json({ message: 'Booking deleted successfully' });
//   } catch (err) {
//     console.error("❌ Error deleting booking:", err.message || err);
//     res.status(500).json({ message: "Server error deleting booking." });
//   }
// });

// DELETE /api/bookings/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});


export default router;
