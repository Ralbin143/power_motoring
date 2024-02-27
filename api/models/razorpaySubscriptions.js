const mongoose = require("mongoose");

const rzrsubSchema = new mongoose.Schema({
  plan_name: {
    type: String,
    required: true,
  },
  planValidity: {
    type: String,
    required: true,
  },
  subscriptionAmount: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("razor_subscriptions", rzrsubSchema);
