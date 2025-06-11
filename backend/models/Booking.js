import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Organizer or event requester
    required: true,
  },
  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expert', // Previously Vendor
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  message: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending',
  },
  cancelledBy: {
    type: String, // 'organizer' or 'expert'
    default: null,
  },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
