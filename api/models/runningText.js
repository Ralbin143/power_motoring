const mongoose = require("mongoose");

const runningTextSchema = mongoose.Schema({
  runningText: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("running_text", runningTextSchema);
