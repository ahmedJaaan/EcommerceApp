const User = require("../Models/user");
const Cart = require("../Models/cart");
const Product = require("../Models/product");
const Coupon = require("../Models/coupon");
exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    let products = [];
    const user = await User.findOne({ email: req.user.email }).exec();
    let cartExistByThisUser = await Cart.findOne({
      orderedBy: user._id,
    }).exec();

    if (cartExistByThisUser) {
      cartExistByThisUser.deleteOne();
      console.log("Cart deleted", cartExistByThisUser);
    }

    for (let i = 0; i < cart.length; i++) {
      const product = await Product.findById(cart[i]._id).exec();

      if (product) {
        let object = {
          product: product._id,
          count: cart[i].count,
          color: cart[i].color,
          price: product.price,
        };
        products.push(object);
      }
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }

    let newCart = new Cart({
      products,
      cartTotal,
      orderedBy: user._id,
    });
    await newCart.save();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOne({ orderedBy: user._id })
      .populate("products.product", "_id title images price")
      .exec();

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const { cartTotal, products, totalAfterDiscount } = cart;
    res.json({ cartTotal, products, totalAfterDiscount });
  } catch (error) {
    console.error("Error in get user cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOne({ orderedBy: user._id }).exec();
    await cart.deleteOne();
    res.json({ ok: true });
  } catch (error) {
    console.error("error in empty cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address },
    { new: true }
  ).exec();
  console.log(userAddress);
  res.json({ ok: true });
};
exports.applyCouponToUser = async (req, res) => {
  try {
    const { coupon } = req.body;
    const validCoupon = await Coupon.findOne({ name: coupon }).exec();
    if (validCoupon === null) {
      return res.status(404).json({ error: "Invalid coupon code" });
    }
    const user = await User.findOne({ email: req.user.email }).exec();
    const { cartTotal, products } = await Cart.findOne({
      orderedBy: user._id,
    })
      .populate("products.product", "_id title price")
      .exec();

    const discountAmount = (cartTotal * (validCoupon.discount / 100)).toFixed(
      2
    );
    const totalAfterDiscount = Math.floor(
      (cartTotal - discountAmount).toFixed(2)
    );

    await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    ).exec();
    res.json({
      success: true,
      message: "Coupon applied successfully",
      totalAfterDiscount,
    });
  } catch (error) {
    console.error("Error in applying coupon", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
