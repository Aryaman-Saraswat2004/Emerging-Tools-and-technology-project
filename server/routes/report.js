const express = require("express");
const Report = require("../models/Report");
const auth = require("../middleware/auth");

const router = express.Router();

// Create report (USER)
router.post("/", auth, async (req, res) => {
  const { image, description, lat, lng } = req.body;

  const report = await Report.create({
    image,
    description,
    location: { lat, lng },
    createdBy: req.user.id,
  });

  res.json(report);
});

// Get reports (role based)
router.get("/", auth, async (req, res) => {
  let reports;

  if (req.user.role === "ADMIN") {
    reports = await Report.find();
  } else if (req.user.role === "VOLUNTEER") {
    reports = await Report.find().populate("createdBy");
  } else {
    reports = await Report.find({ createdBy: req.user.id });
  }

  res.json(reports);
});

// Update status (ADMIN)
router.patch("/:id", auth, async (req, res) => {
  const { status } = req.body;

  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(report);
});

module.exports = router;
