import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  phone: {
    type: String,
    required: [true, 'Please enter your phone number']
  },
  role: {
    type: String,
    enum: ['organizer', 'expert', 'attendee', 'admin'],  
    default: 'attendee'
  },
  blocked: {
    type: Boolean,
    default: false
  },
  status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending',
},
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);



export default User;
