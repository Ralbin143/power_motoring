const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  custName: {
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
  images: {
    type: Array,
    required: false,
  },
  feedback: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

module.exports = mongoose.model("feedbacks", feedbackSchema);
