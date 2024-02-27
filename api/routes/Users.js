const express = require("express");
const {
  registerWithEmail,
  registerWithPhone,
  activeSubscription,
  getUserData,
  checkSubscriptionStatus,
  updateProfile,
  checkMobileExists,
  checkMobileLoggedin,
  forceLogin,
  currentSubscriptionData,
} = require("../controllers/User");
const router = express.Router();

router.post("/register-with-email", registerWithEmail);
router.post("/register-with-phone", registerWithPhone);
router.post("/get-user-data", getUserData);
router.post("/active-subscription", activeSubscription);
router.post("/check-subscription-status", checkSubscriptionStatus);
router.post("/check-subscription-data", currentSubscriptionData);
router.post("/update-profile", updateProfile);
router.post("/check-mobile-exists", checkMobileExists);
router.post("/check-mobile-loggedin", checkMobileLoggedin);
router.post("/force_login", forceLogin);

module.exports = router;
