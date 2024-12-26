const Review = require('../models/review');
const User = require('../models/register');

exports.writeReview = async (req, res) => {
  try {
    const { userId, rating, description } = req.body; // Extract userId, rating, and description from the request body

    if (!userId || !rating) {
      return res.status(400).json({ message: "User ID and rating are required" });
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new review
    const newReview = new Review({
      email: user.email,  // Using the user's email for review
      rating,
      description,
    });

    // Save the review
    await newReview.save();

    // Optionally, you can also push the review to a product here if needed (assuming product data is passed)
    // const product = await Product.findById(productId); // You can pass productId if needed
    // product.reviews.push(newReview._id);
    // await product.save();

    res.status(201).json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
