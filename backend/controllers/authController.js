const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  insertGlobalExercisesForUser,
} = require("../utils/insertGlobalExercisesForUser");
const TokenBlacklist = require("../models/tokenBlacklist.mode");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    await insertGlobalExercisesForUser(user._id);
    res.status(201).json({ userId: user._id, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Password do not match" });

    const token = createToken(user._id);
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.logout = async (req, res) => {
    try {
        // Get token from Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ message: "No token provided" });
        }
        
        const token = authHeader.replace('Bearer ', '');
        const userId = req.user.id; // From auth middleware
        
        // Check if token is already blacklisted
        const existingBlacklistedToken = await TokenBlacklist.findOne({ token });
        if (existingBlacklistedToken) {
            return res.status(400).json({ message: "Token already invalidated" });
        }
        
        // Get token expiration date
        const expiresAt = getTokenExpirationDate(token);
        
        // Add token to blacklist
        await TokenBlacklist.create({
            token,
            userId,
            expiresAt,
            reason: 'logout'
        });
        
        res.status(200).json({ 
            message: "Logout successful. Token has been invalidated." 
        });
    } catch (error) {
        // Handle duplicate key error (token already exists)
        if (error.code === 11000) {
            return res.status(400).json({ message: "Token already invalidated" });
        }
        res.status(500).json({ message: error.message });
    }
};
// Helper function to get token expiration date
const getTokenExpirationDate = (token) => {
  try {
    const decoded = jwt.decode(token);
    return new Date(decoded.exp * 1000); // Convert from seconds to milliseconds
  } catch (error) {
    // If token is malformed, set expiration to 1 hour from now as fallback
    return new Date(Date.now() + 60 * 60 * 1000);
  }
};
