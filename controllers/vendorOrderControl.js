const Order = require("../models/orderModel");
const { verifyJwtToken } = require("../utils/token.util");

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { order_id,  status } = req.body;
    const token = req.headers['authorization'].split(' ')[1];
    const vendor_id = verifyJwtToken(token);
    console.log(vendor_id);

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

