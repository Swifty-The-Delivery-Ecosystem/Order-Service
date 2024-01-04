const Order = require("../models/orderModel");

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, restaurantId, status } = req.body;

    // Update the order status in the database
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId, restaurant_id: restaurantId },
      { $set: { payment_status: status } },
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
    const { restaurantId } = req.query;

    const orders = await Order.find({
      restaurant_id: restaurantId,
      payment_status: 1, // Assuming "1" represents "payment_success" status
    });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
