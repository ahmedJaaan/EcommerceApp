const Order = require("../Models/order");

exports.orders = async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .populate("products.product")
      .sort({ createdAt: -1 })
      .exec();
    res.json(allOrders);
  } catch (error) {
    console.error("Error in orders", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.orderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    const updated = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).exec();

    res.json(updated);
  } catch (error) {
    console.error("Error in orderStatus", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
