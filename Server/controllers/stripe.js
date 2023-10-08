const User = require("../Models/user");
const Cart = require("../Models/cart");
const Product = require("../Models/product");
const Coupon = require("../Models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Create payment intent failed", error);
  }
};
