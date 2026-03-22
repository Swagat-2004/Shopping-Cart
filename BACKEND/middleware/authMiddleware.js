const jwt = require("jsonwebtoken");

// ================= AUTH MIDDLEWARE =================
// 👉 This checks if user is logged in (token present & valid)
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No token or wrong format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // ✅ Extract token from "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    // ✅ Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach decoded user info (id, role) to request
    req.user = decoded;

    next(); // move to next middleware/route

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// ================= ADMIN MIDDLEWARE =================
// 👉 This checks if user is admin
const adminMiddleware = (req, res, next) => {
  try {
    // ❌ If user is not admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access denied" });
    }

    next(); // allow access

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


// ✅ Export both middlewares properly
module.exports = {
  authMiddleware,
  adminMiddleware
};