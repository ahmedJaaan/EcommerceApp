const User = require("../Models/user");
const Cart = require("../Models/cart");
const Product = require("../Models/product");
const Coupon = require("../Models/coupon");
const Order = require("../Models/order");
const uniqid = require("uniqid");
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

exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email }).exec();
    const { products } = await Cart.findOne({
      orderedBy: user._id,
    }).exec();
    let newOrder = await new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
      orderStatus: "Not Processed",
    }).save();
    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    let updated = await Product.bulkWrite(bulkOption, {});
    res.json({ ok: true });
  } catch (error) {
    console.log("Error in creating order", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.orders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const userOrders = await Order.find({ orderedBy: user._id })
      .populate("products.product")
      .sort({ createdAt: -1 })
      .exec();
    res.json(userOrders);
  } catch (error) {
    console.log("Error in orders", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: productId } },
      { new: true }
    ).exec();
    // console.log(user);
    res.json({ ok: true });
  } catch (error) {
    console.log("Error in adding to wishlist", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.wishlist = async (req, res) => {
  try {
    const list = await User.findOne({ email: req.user.email })
      .select("wishlist")
      .populate("wishlist")
      .exec();
    // console.log("yuguuyugyuyf", list);
    res.json(list);
  } catch (error) {
    console.log("Error in removing from wishlist", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { wishlist: productId } }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    console.log("Error in wishlist", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createCashOrder = async (req, res) => {
  try {
    const { COD, couponApplied } = req.body;

    const user = await User.findOne({ email: req.user.email }).exec();
    const userCart = await Cart.findOne({
      orderedBy: user._id,
    }).exec();
    if (!COD) {
      return res.status(400).send("Create cash order failed");
    }

    let finalAmount = 0;

    if (userCart.totalAfterDiscount) {
      finalAmount = Math.round(userCart.totalAfterDiscount * 100);
    } else {
      finalAmount = Math.round(userCart.cartTotal * 100);
    }
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        amount: finalAmount,
        currency: "usd",
        status: "Cash on Delivery",
        created: Date.now(),
        payment_method_types: ["cash"],
      },
      orderedBy: user._id,
      orderStatus: "Cash On Delivery",
    }).save();
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    let updated = await Product.bulkWrite(bulkOption, {});
    res.json({ ok: true });
  } catch (error) {
    console.log("Error in creating order", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
