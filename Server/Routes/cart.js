const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");
const { userCart, getUserCart } = require("../controllers/cart");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
module.exports = router;
