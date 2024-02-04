const Order = require("../models/orderModel");

exports.orderStatusDelivered = async (req, res, next) => {
  try {
    const { order_id, status } = req.body;
    const orderDelivered = await Order.findOneAndUpdate(
      { order_id: order_id },
      { $set: { order_status: status } },
      { new: true }
    );
    if (!orderDelivered) {
      return res.status(400).json({ error: "Could not update" });
    }

    res.status(200).json("Delivered status updated");
  } catch (error) {
    return res.status(400).json({ error: "Bad Request" });
  }
};

exports.getOrdersDeliveryBoy = async (req, res, next) => {
  try {
    const delivery_boy_id = req.params.delivery_boy_id;
    console.log("checking", delivery_boy_id);
    const orders = await Order.find({
      delivery_boy_id: delivery_boy_id,
      order_status: "departed",
    });
    if (!orders) {
      return res.status(404).json({ error: "Could not find" });
    }

    res.status(200).json({ orders });
  } catch (error) {}
};
