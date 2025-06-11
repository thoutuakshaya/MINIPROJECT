import User from '../models/User.js';

// Existing getAllUsers, blockUser, deleteUser...

export const getProfilesForReview = async (req, res) => {
  try {
    // You can filter users whose profile is pending/needs review
    const usersWithProfiles = await User.find({
      role: { $in: ['expert', 'organizer', 'attendee'] },
      // If there's a status field in profile, e.g. status: 'pending'
    });

    res.json(usersWithProfiles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profiles' });
  }
};
