import express from "express";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import { protect, isOrganizer } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 1. Attendee registers for an event (authentication optional - can remove protect if public registration)
router.post("/register", protect, async (req, res) => {
  try {
    const { eventId, name, email, phone } = req.body;
    if (!eventId || !name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if already registered by this email for this event
    const existing = await Registration.findOne({ event: eventId, email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "You are already registered for this event" });
    }

    const registration = new Registration({
      event: eventId,
      user: req.user._id,
      name,
      email,
      phone,
    });

    await registration.save();
    res.status(201).json({ message: "Registration successful", registration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 2. Organizer: Get registrations for an event
router.get(
  "/event/:eventId/registrations",
  protect,
  isOrganizer,
  async (req, res) => {
    try {
      const { eventId } = req.params;
      const registrations = await Registration.find({ event: eventId }).populate(
        "user",
        "name email"
      );
      res.json({ registrations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// 3. Organizer: Update registration info (e.g., check-in)
router.put("/:registrationId", protect, isOrganizer, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { checkedIn, name, email, phone } = req.body;

    const registration = await Registration.findById(registrationId);
    if (!registration) return res.status(404).json({ message: "Not found" });

    if (typeof checkedIn === "boolean") registration.checkedIn = checkedIn;
    if (name) registration.name = name;
    if (email) registration.email = email;
    if (phone) registration.phone = phone;

    await registration.save();

    res.json({ message: "Registration updated", registration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 4. Organizer: Delete a registration
router.delete("/:registrationId", protect, isOrganizer, async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findByIdAndDelete(registrationId);
    if (!registration) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Registration deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 5. Attendee: Get all events they have registered for
router.get("/myevent", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const registrations = await Registration.find({ user: userId }).populate("event");
    res.json({ registrations });
  } catch (err) {
    console.error("Error fetching joined events:", err.message);
    res.status(500).json({ error: "Failed to fetch joined events" });
  }
});


export default router;
