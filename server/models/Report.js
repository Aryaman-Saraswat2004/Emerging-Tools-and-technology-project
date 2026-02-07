const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    image: String,

    description: {
      type: String,
      required: true,
    },

    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    address: {
      street: String,
      area: String,
      city: String,
      landmark: String,
      pincode: String,
    },
    phone: {
      type: String,
      required: true, 
    },
     
    status: {
      type: String,
      enum: [
        "PENDING",       
        "VERIFIED",       
        "TEAM_ASSIGNED",  
        "RESOLVED",       
        "REJECTED",       
      ],
      default: "PENDING",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },

    
    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },

    
    financialAid: {
      amount: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: ["NOT_APPROVED", "APPROVED", "DISBURSED"],
        default: "NOT_APPROVED",
      },

      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", 
        default: null,
      },

      approvedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Report", reportSchema);
