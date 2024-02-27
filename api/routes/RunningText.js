const express = require("express");
const {
  getRunningText,
  newRunningText,
} = require("../controllers/RunningText");
const router = express.Router();

router.post("/", newRunningText);
router.get("/", getRunningText);

module.exports = router;
