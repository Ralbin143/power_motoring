const express = require("express");
const {
  newPayment,
  createPayments,
  getSinglePayment,
} = require("../controllers/Payments");
const SUBSCRIPTIONS = require("../models/Subscription");
const router = express.Router();
const USERS = require("../models/User");

router.post("/crate-payment", createPayments);
router.post("/get-payment", getSinglePayment);
router.post("/new-payment", newPayment);

router.post(
  "/webhook",
  // express.raw({ type: "application/json" }),
  async (req, res) => {
    if (req.body.event === "payment.authorized") {
      const NEW_SUBSCRIPTIONS = new SUBSCRIPTIONS({
        cust_id: req.body.payload.payment.entity.notes.custId,
        planName: req.body.payload.payment.entity.notes.planName,
        planValidity: req.body.payload.payment.entity.notes.planValidity,
        status: "Active",
      });
      await NEW_SUBSCRIPTIONS.save();
      const query = {
        userID: req.body.payload.payment.entity.notes.custId,
      };
      const data = {
        $set: {
          subscriptionPlan: req.body.payload.payment.entity.notes.planName,
          subscriptionDuration:
            req.body.payload.payment.entity.notes.planValidity,
          lastPaymentDate: new Date(),
        },
      };
      await USERS.updateOne(query, data);
    }
  }
);

module.exports = router;
