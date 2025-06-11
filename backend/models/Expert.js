import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  expertise: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  priceRange: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  availability: {
    type: [Date],
    default: []
  },
  photo: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Expert = mongoose.model('Expert', expertSchema);
export default Expert;
