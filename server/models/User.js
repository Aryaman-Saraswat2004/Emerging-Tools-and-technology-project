const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN", "VOLUNTEER"],
    default: "USER",
  },
  city: String,
});

module.exports = mongoose.model("User", userSchema);
