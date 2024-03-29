const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUser,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
} = require("../controllers/cart");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);
router.post("/user/cart/coupon", authCheck, applyCouponToUser);
router.post("/user/order", authCheck, createOrder);
router.post("/user/cash-order", authCheck, createCashOrder);
router.get("/user/orders", authCheck, orders);
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);
module.exports = router;
