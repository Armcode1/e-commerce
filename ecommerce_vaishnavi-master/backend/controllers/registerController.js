
const User = require('../models/register');
const UserDetails = require('../models/userDetails');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; 

exports.registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const addDetails = new UserDetails({
      email,
    });

    await addDetails.save();

    await User.findByIdAndUpdate(newUser._id, { additionalDetails: addDetails._id }, { new: true });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    
    const user = await User.findOne({ email }).populate('additionalDetails'); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        additionalDetails: user.additionalDetails, 
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
