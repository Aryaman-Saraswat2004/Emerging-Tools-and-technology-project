const express = require("express");
const User = require("../models/User");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();
router.get("/volunteers", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const volunteers = await User.find({ role: "VOLUNTEER" })
      .select("name email city");

    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch volunteers" });
  }
});
router.patch("/make-volunteer/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: "VOLUNTEER" },
      { new: true }
    );

    res.json({
      message: "User promoted to volunteer",
      userId: user._id,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to promote user" });
  }
});

module.exports = router;
