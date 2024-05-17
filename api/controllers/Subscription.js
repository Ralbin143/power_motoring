const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Subscription = require("../models/Subscription");
const USERS = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const RAZORPAYSUBSCRIPTIONS = require("../models/razorpaySubscriptions");

const getSubscriptionStatus = async (req, res) => {
  try {
    const query = await Subscription.find()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((e) => {
        return res.status(500).json(response);
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const newSubscription = asyncHandler(async (req, res) => {
  const newSubscription = new Subscription({
    cust_id: req.body.cust_id,
    planName: req.body.plan_name,
    planValidity: req.body.planValidity,
    status: req.body.status,
  });

  const query = {
    userID: req.body.cust_id,
  };
  const data = {
    $set: {
      subscriptionPlan: req.body.plan_name,
      subscriptionDuration: req.body.planValidity,
      lastPaymentDate: new Date(),
      trialUsed: true,
    },
  };
  await USERS.updateOne(query, data);
  await newSubscription.save();
  return res.status(200).json(newSubscription);
});

const getSubscription = asyncHandler(async (req, res) => {
  const query = {
    cust_id: new mongoose.Types.ObjectId(req.body.id),
  };
  const getSubscription = Subscription.find(query);
  return res.status(200).json(getSubscription);
});

const newSubscriptionrzr = async (req, res) => {
  const newPrice = RAZORPAYSUBSCRIPTIONS({
    plan_name: req.body.plan_name,
    planValidity: req.body.planValidity,
    subscriptionAmount: req.body.subscriptionAmount,
  });
  await newPrice.save();
  return res.status(200).send();
};

const getSubscriptionList = asyncHandler(async (req, res) => {
  const prices = await RAZORPAYSUBSCRIPTIONS.find();

  return res.status(200).send(prices);
});

const isTrialUsed = async (req, res) => {
  try {
    const query = {
      userID: req.body.cust_id,
    };
    const userData = await USERS.find(query);
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const newPrelaunchOffer = async (req, res) => {
  try {
    // const newSubscription = new Subscription({
    //   cust_id: req.body.cust_id,
    //   planName: "Pre-Launch Offer",
    //   planValidity: 1,
    //   status: "Launch-Offer",
    // });

    const query = {
      userID: req.body.custId,
    };
    const data = {
      $set: {
        subscriptionPlan: "Pre Launch Offer",
        subscriptionDuration: "x",
        lastPaymentDate: new Date(),
      },
    };
    await USERS.updateOne(query, data);
    // await newSubscription.save();
    return res.status(200).json(newSubscription);
    // const query = {
    //   userID: req.body.custId,
    // };
    // const data = {
    //   $set: {
    //     preLaunchOfferUsed: true,
    //   },
    // };
    // const dddd = await USERS.updateOne(query, data);

    // console.log(dddd);
    // const userData = await USERS.find(query);
    // return res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  newSubscription,
  getSubscription,
  getSubscriptionList,
  newSubscriptionrzr,
  isTrialUsed,
  newPrelaunchOffer,
};
