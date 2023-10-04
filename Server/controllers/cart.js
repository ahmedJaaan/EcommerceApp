const User = require("../Models/user");
const Cart = require("../Models/cart");
const Product = require("../Models/product");

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

    console.log("Cart saved", newCart);
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
    const { cartTotal, products, totalAfterDiscount } = cart;
    res.json({ cartTotal, products, totalAfterDiscount });
  } catch (error) {
    console.error("error in get user cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
