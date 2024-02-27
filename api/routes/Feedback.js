const express = require("express");
const {
  addFeedback,
  viewSingleFeedback,
  viewAllFeedbacks,
} = require("../controllers/Feedback");
const {
  uploadPhoto,
  uploadFeedbackPhoto,
} = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
  "/add-feedback",
  // uploadFeedbackPhoto.array("image", 10),
  addFeedback
);
router.get("/view-feedback", viewAllFeedbacks);
router.post("/view-feedback", viewSingleFeedback);

module.exports = router;
