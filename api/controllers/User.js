const chalk = require("chalk");
const USERS = require("../models/User");
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const registerWithEmail = async (req, res) => {
  try {
    const userCount = await USERS.find({ userID: req.body.userID });

    console.log(req.body);

    if (userCount.length === 0) {
      const customer = await stripe.customers.create({
        name: req.body.fullName,
        email: req.body.email,
        phone: req.body.contactNo,
      });

      const newUser = new USERS({
        userID: req.body.userID,
        stripeCustID: customer.id,
        fullName: req.body.fullName,
        contactNo: req.body.contactNo,
        email: req.body.email,
        deviceID: req.body.deviceID,
      });
      await newUser
        .save()
        .then((response) => {
          return res.status(200).json(response);
        })
        .catch((e) => {
          return res.status(500).json(e);
        });
    } else {
      return res.status(200).json(userCount[0]);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const registerWithPhone = async (req, res) => {
  const customer = await stripe.customers.create({
    name: req.body.fullName,
    email: req.body.email,
    phone: req.body.contactNo,
  });
  const newUser = new USERS({
    userID: req.body.userID,
    stripeCustID: customer.id,
    fullName: req.body.fullName,
    contactNo: req.body.contactNo,
    email: req.body.email,
    status: "Live",
    subscriptionStatus: "Inactive",
  });

  try {
    await newUser
      .save()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((e) => {
        return res.status(500).json(e);
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const activeSubscription = async (req, res) => {
  try {
    const query = {
      userID: req.body.userID,
    };
    const data = {
      $set: {
        subscriptionStatus: "Active",
      },
    };
    await USERS.updateOne(query, data)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((e) => {
        return res.status(500).json(e);
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

function getNextMonthSameDate(currentDate, validity) {
  // Parse the current date string into a Date object
  const currentDateObject = new Date(currentDate);

  // Get the current day of the month
  const currentDay = currentDateObject.getDate() - 1;

  // Set the date to the next month
  currentDateObject.setMonth(currentDateObject.getMonth() + parseInt(validity));

  // Set the day of the month to the current day
  currentDateObject.setDate(currentDay);

  // Format the result as a string (you can adjust the format as needed)
  const nextMonthSameDate = currentDateObject.toISOString().split("T")[0];

  return currentDateObject;
}

const getUserData = async (req, res) => {
  try {
    const query = {
      userID: req.body.uid,
    };
    await USERS.find(query)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((e) => {
        return res.status(500).json(e);
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const checkSubscriptionStatus = async (req, res) => {
  const query = {
    userID: req.body.custID,
  };

  try {
    const userData = await USERS.find(query).limit(1);
    if (
      req.body.custID === null ||
      req.body.custID === undefined ||
      req.body.custID === ""
    ) {
      return res.status(200).json("Inactive");
    } else if (
      userData[0].subscriptionPlan === "" &&
      userData[0].subscriptionDuration === ""
    ) {
      return res.status(200).json("Inactive");
    } else if (userData[0].subscriptionDuration === "0") {
      function addDaysToDate(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
      const currentDatexxx = new Date();
      if (addDaysToDate(userData[0].lastPaymentDate, 7) > currentDatexxx) {
        return res.status(200).json("Live");
      } else {
        return res.status(200).json("Inactive");
      }
    } else {

      function addDaysToDate(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
      
      const nextMonthSameDate = addDaysToDate(userData[0].lastPaymentDate, parseInt(userData[0].subscriptionDuration))
      
      // const nextMonthSameDate = getNextMonthSameDate(
      //   userData[0].lastPaymentDate,
      //   userData[0].subscriptionDuration
      // );



      const currentDatexxx = new Date();
      if (nextMonthSameDate > currentDatexxx) {
        return res.status(200).json("Live");
      } else {
        return res.status(200).json("Inactive");
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const currentSubscriptionData = async (req, res) => {
  try {
    const query = {
      userID: req.body.custID,
    };
    const userData = await USERS.find(query).limit(1);

    if (userData[0].lastPaymentDate !== "") {
      const nextMonthSameDate = getNextMonthSameDate(
        userData[0].lastPaymentDate,
        userData[0].subscriptionDuration
      );

      const today = new Date();

      // Calculate total days between last payment date and next month's same date
      // const daysBetweenPayments = Math.ceil(
      //   (nextMonthSameDate - userData[0].lastPaymentDate) /
      //     (1000 * 60 * 60 * 24)
      // );

     
      const daysBetweenPayments = Math.ceil(
        (nextMonthSameDate - userData[0].lastPaymentDate) /
          (1000 * 60 * 60 * 24)
      );

      // Calculating the total days until the next billing date
      const remainingDays = Math.ceil(
        (nextMonthSameDate - today) / (1000 * 60 * 60 * 24)
      );

      // Calculating the total days passed since the last payment date
      const daysSinceLastPayment = Math.ceil(
        (today - userData[0].lastPaymentDate) / (1000 * 60 * 60 * 24)
      );

      if (userData[0].subscriptionDuration === "0") {
        function addDaysToDate(date, days) {
          const result = new Date(date);
          result.setDate(result.getDate() + days);
          return result;
        }

        const remainingDaysx = Math.ceil(
          (addDaysToDate(userData[0].lastPaymentDate, 6) - today) /
            (1000 * 60 * 60 * 24)
        );
        return res.status(200).json({
          maxDays: 6,
          daysSinceLastPayment: remainingDaysx,
          expiryDate: moment( 
            addDaysToDate(userData[0].lastPaymentDate, 6)
          ).format("DD-MM-YYYY"),
        });
      } else {

        function addDaysToDate(date, days) {
          const result = new Date(date);
          result.setDate(result.getDate() + days);
          return result;
        }
        var maxDayString = daysBetweenPayments + 1;

        var maxDaysxx  = parseInt( userData[0].subscriptionDuration)
        var dateDiff  = (parseInt( userData[0].subscriptionDuration)-1)
 

        return res.status(200).json({
          maxDays: parseInt( userData[0].subscriptionDuration)-1,
          // maxDays: maxDayString,
          daysSinceLastPayment: maxDaysxx - daysSinceLastPayment,
          // expiryDate: moment(3).format("DD-MM-YYYY"),
          expiryDate: moment(
            addDaysToDate(userData[0].lastPaymentDate, maxDaysxx-1)
          ).format("DD-MM-YYYY"),
        });
      }
    } else {
      return res.status(200).json();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const query = {
      userID: req.body.userID,
    };
    const data = {
      $set: {
        fullName: req.body.fullName,
        contactNo: req.body.contactNo,
        email: req.body.email,
      },
    };

    const value = USERS.updateOne(query, data);
    return res.status(200).json(value);
  } catch (error) {
    return;
  }
};

const checkMobileExists = async (req, res) => {
  try {
    const query = {
      contactNo: req.body.contactNo,
    };
    const userData = await USERS.find(query);
    console.log(userData);
    return res.status(200).json(userData);
  } catch (error) {
    return;
  }
};

const checkMobileLoggedin = async (req, res) => {
  try {
    const query = {
      userID: req.body.userID,
    };

    const userData = await USERS.find(query);

    console.log(userData[0].deviceID);
    if (
      userData[0].deviceID === null ||
      userData[0].deviceID === undefined ||
      userData[0].deviceID === "" ||
      userData[0].deviceID === req.body.deviceID
    ) {
      await USERS.updateOne(
        { userID: req.body.userID },
        { deviceID: req.body.deviceID }
      );
      return res.status(200).json({ message: "not logged in" });
    } else {
      return res.status(200).json({ message: "already logged in" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const forceLogin = async (req, res) => {
  try {
    const query = {
      userID: req.body.userID,
    };
    const data = {
      $set: {
        deviceID: req.body.searchKey,
      },
    };

    await USERS.updateOne(query, data);

    const userData = await USERS.find(query);

    return res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  registerWithEmail,
  registerWithPhone,
  getUserData,
  activeSubscription,
  checkSubscriptionStatus,
  updateProfile,
  checkMobileExists,
  checkMobileLoggedin,
  forceLogin,
  currentSubscriptionData,
};
