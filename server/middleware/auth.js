const jwt = require("jsonwebtoken");

/* =========================
   VERIFY JWT TOKEN
   ========================= */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Check if Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 2️⃣ Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // 3️⃣ Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach decoded user data to request
    req.user = decoded; // { id, role, city }

    next(); // allow request to continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/* =========================
   VERIFY ADMIN ROLE
   ========================= */
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

/* =========================
   VERIFY VOLUNTEER ROLE
   ========================= */
const verifyVolunteer = (req, res, next) => {
  if (!req.user || req.user.role !== "VOLUNTEER") {
    return res.status(403).json({ message: "Volunteer access only" });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyVolunteer,
};
