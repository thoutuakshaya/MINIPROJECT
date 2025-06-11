import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import path from "path";
import fs from "fs";

export const registerAttendee = async (req, res) => {
  try {
    const { eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required." });
    }

    // Check event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const userId = req.user._id;

    // Prevent duplicate registrations
    const existing = await Registration.findOne({ event: eventId, user: userId });
    if (existing) {
      return res.status(400).json({ message: "You are already registered for this event." });
    }

    // Create registration with user info from req.user
    const registration = new Registration({
      event: eventId,
      user: userId,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone || "",
    });

    await registration.save();
    res.status(201).json({ message: "Registered successfully", registration });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEventAttendees = async (req, res) => {
  try {
    const { eventId } = req.params;
    const attendees = await Registration.find({ event: eventId }).sort("-createdAt");
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch attendees" });
  }
};

export const markCheckIn = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const updated = await Registration.findByIdAndUpdate(
      registrationId,
      { checkedIn: true },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Check-in failed" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const registrations = await Registration.find({ user: userId }).populate("event");
    const events = registrations.map((r) => r.event);
    res.json(events);
  } catch (err) {
    console.error("Fetch my events failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const downloadCertificate = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;
    const reg = await Registration.findOne({ user: userId, event: eventId });
    if (!reg) {
      return res.status(404).json({ message: "You are not registered for this event." });
    }

    const filePath = path.join(process.cwd(), "certificates", `${eventId}.pdf`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Certificate not available yet." });
    }

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
