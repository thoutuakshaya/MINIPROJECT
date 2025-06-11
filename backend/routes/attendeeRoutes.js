// routes/attendeeRoutes.js

import express from "express";
import {
  registerAttendee,
  getEventAttendees,
  getMyEvents,
  downloadCertificate,
  markCheckIn,
} from "../controllers/attendeeController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();



// Protected routes (require valid auth token):
router.post("/register", protect, registerAttendee);

router.get("/event/:eventId/attendees", protect, getEventAttendees);
router.patch("/checkin/:registrationId", protect, markCheckIn);
router.get("/my-events", protect, getMyEvents);
router.get("/certificate/:eventId", protect, downloadCertificate);

export default router;
