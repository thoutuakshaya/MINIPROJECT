import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  budget: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ This was organizer before
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
