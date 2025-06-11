import Expert from '../models/Expert.js'; // Make sure the new model is imported

// @desc Create a new expert
// @route POST /api/experts
// @access Private
export const createExpert = async (req, res) => {
  try {
    const {
      name,
      expertise,
      bio,
      priceRange,
      location,
      availability,
      photo,
      skills
    } = req.body;

    const newExpert = new Expert({
      name,
      expertise,
      bio,
      priceRange,
      location,
      availability,
      photo,
      skills,
      createdBy: req.user._id
    });

    const saved = await newExpert.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
