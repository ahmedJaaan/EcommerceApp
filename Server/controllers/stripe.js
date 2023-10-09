const User = require("../Models/user");
const Cart = require("../Models/cart");
const Product = require("../Models/product");
const Coupon = require("../Models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({
      orderedBy: user._id,
    }).exec();

    let finalAmount = 0;

    if (totalAfterDiscount) {
      finalAmount = Math.round(totalAfterDiscount * 100);
    } else {
      finalAmount = Math.round(cartTotal * 100);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: "usd",
    });
    console.log("paymentInten", finalAmount);
    res.json({
      clientSecret: paymentIntent.client_secret,
      cartTotal,
      totalAfterDiscount,
      payableAmount: finalAmount,
    });
  } catch (error) {
    console.log("Create payment intent failed", error);
    res.status(500).json({ error: "Create payment intent failed" });
  }
};
