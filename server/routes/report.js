const express = require("express");
const Report = require("../models/Report");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

/* =========================
   CREATE REPORT (USER)
   ========================= */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { image, description, lat, lng, address } = req.body;
res
    const report = await Report.create({
      image,
      description,
      location: { lat, lng },
      address,
      createdBy: req.user.id,
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Failed to create report" });
  }
});

/* =========================
   GET REPORTS (ROLE BASED)
   ========================= */
router.get("/", verifyToken, async (req, res) => {
  try {
    let reports;

    if (req.user.role === "ADMIN") {
      // Admin sees all reports
      reports = await Report.find()
        .populate("createdBy", "name email city")
        .populate("assignedVolunteer", "name email");
    } 
    else if (req.user.role === "VOLUNTEER") {
      // Volunteer sees ONLY assigned reports
      reports = await Report.find({
        assignedVolunteer: req.user.id,
      })
        .populate("createdBy", "name email city phone");
    } 
    else {
      // User sees only their own reports
      reports = await Report.find({
        createdBy: req.user.id,
      });
    }

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});

/* =========================
   ASSIGN VOLUNTEER (ADMIN)
   ========================= */
router.patch("/:id/assign", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { volunteerId } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        assignedVolunteer: volunteerId,
        status: "TEAM_ASSIGNED",
      },
      { new: true }
    );

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Failed to assign volunteer" });
  }
});

/* =========================
   UPDATE STATUS (ADMIN)
   ========================= */
router.patch("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
