const express = require("express");
const {
  newSubscription,
  getSubscription,
  getSubscriptionList,
  newSubscriptionrzr,
  isTrialUsed,
} = require("../controllers/Subscription");
const router = express.Router();

router.post("/new-subscription", newSubscription);
router.post("/get-subscription", getSubscription);
router.post("/add_subscription", newSubscriptionrzr);
router.get("/subscription-list", getSubscriptionList);
router.post("/is-trial-used", isTrialUsed);

module.exports = router;
