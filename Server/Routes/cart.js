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
} = require("../controllers/cart");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);
router.post("/user/cart/coupon", authCheck, applyCouponToUser);
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);

module.exports = router;
