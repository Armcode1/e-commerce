const Review = require('../models/review');
const User = require('../models/register');

exports.viewReviews = async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from the request body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find reviews by the user's email
    const reviews = await Review.find({ email: user.email });

    res.status(200).json({ message: "Reviews retrieved successfully", reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
