const Order = require("../models/orderModel");

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { order_id, vendor_id, status } = req.body;

    // Update the order status in the database
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: order_id },
      { $set: { orderStatus: status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const { vendor_id } = req.query;

    const orders = await Order.find({
      vendor_id: vendor_id,
      payment_status: "paid"
    });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};