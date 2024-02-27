const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  stripeCustID: {
    type: String,
    required: false,
  },
  fullName: {
    type: String,
    required: false,
  },

  contactNo: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: false,
  },

  status: {
    type: String,
    required: false,
  },

  subscriptionPlan: {
    type: String,
    default: "",
    required: false,
  },
  subscriptionDuration: {
    type: String,
    default: "",
    required: false,
  },
  lastPaymentDate: {
    type: Date,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  deviceID: {
    type: String,
    default: "no_device",
    required: false,
  },
  trialUsed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
