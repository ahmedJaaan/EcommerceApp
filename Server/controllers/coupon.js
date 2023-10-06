const Coupon = require("../Models/coupon");

exports.create = async (req, res) => {
  try {
    const { name, discount, expiry } = req.body;
    const coupon = await new Coupon({ name, discount, expiry });
    coupon.save();
    console.log(coupon);
    res.json(coupon);
  } catch (error) {
    console.log("Error in creating Coupon", error);
    res.status(400).send("Creating Coupon failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.couponId).exec();
    res.json(deleted);
  } catch (error) {
    console.log("Error in deleting Coupon", error);
  }
};

exports.list = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec();
    res.json(coupons);
  } catch (error) {
    console.log("Error in listing Coupons", error);
  }
};
