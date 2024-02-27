const stripe = require("stripe")(process.env.STRIPE_KEY);
const PAYMENTS = require("../models/Payments");

const YOUR_DOMAIN = process.env.CLIENT_DOMAIN;

const createPayments = async (req, res) => {
  const product = await stripe.products.create({
    name: "Gold Special",
  });
};

const getSinglePayment = async (req, res) => {
  const product = await stripe.products.retrieve("prod_OlneFvcebjHq9d");
  return res.status(200).json(product);
};

const newPayment = async (req, res) => {
  try {
    // Create a new payment session with Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1NyF3MSE6BwWWfHGwci6VcnA",
          quantity: 1,
        },
      ],
      // mode: "payment",
      mode: "subscription", // Switch to subscription mode
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    // Redirect the user to the Stripe checkout page
    res.redirect(303, session.url);
  } catch (error) {
    console.error("Error creating payment session:", error.message);
    res.status(500).send("An error occurred while processing your payment.");
  }
};




module.exports = { newPayment, createPayments, getSinglePayment };
