const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  cust_id: {
    type: String,
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  planValidity: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

module.exports = mongoose.model("Subscriptions", subSchema);
