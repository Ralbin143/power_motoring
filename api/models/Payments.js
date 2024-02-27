const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  payment_name: {
    type: String,
    required: true,
  },
  payment_mount: {
    type: Number,
    required: true,
  },
  payment_duration: {
    type: String,
    required: false,
  },
  payment_mode: {
    type: String,
    required: true,
  },
  billing_period: {
    type: String,
    required: true,
  },
  trial_period: {
    type: String,
    required: true,
  },
  payment_description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("payments", paymentSchema);
