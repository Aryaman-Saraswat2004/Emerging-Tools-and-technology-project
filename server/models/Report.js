const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  image: String,
  description: String,
  location: {
    lat: Number,
    lng: Number,
  },
   address: {
    street: String,
    area: String,
    city: String,
    landmark: String,
    pincode: String
  },
  status: {
    type: String,
    enum: ["PENDING", "VERIFIED", "TEAM_ASSIGNED", "RESOLVED", "REJECTED"],
    default: "PENDING",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Report", reportSchema);
