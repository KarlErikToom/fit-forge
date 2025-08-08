const jwt = require("jsonwebtoken");
const TokenBlackList = require("../models/tokenBlacklist.mode");
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token; // <-- read token from cookies

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }

    // Check if token is blacklisted
    const blacklistedToken = await TokenBlackList.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: "Token has been invalidated. Please log in again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired, please log in" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


module.exports = { verifyToken };
