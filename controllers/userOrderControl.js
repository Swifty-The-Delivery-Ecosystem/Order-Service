const Order = require("../models/orderModel");

exports.createOrder = async (req, res, next) => {
  try {
    const {user_id, items, amount, vendor_id,order_instructions} = req.body;
    const order = await Order.create({ user_id, items, amount, vendor_id, order_instructions });
    const paymentResult = await PaymentGatewayService.processPayment(order);
    if (paymentResult.success) {
      // Payment successful, update the order status or perform additional actions
      order.payment_status = 'Paid';
    }
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const activeQueryParam = req.params.active;
    const userID = req.params.user_id;
    let orders;

    // Check the 'active' parameter in the URL
    if (activeQueryParam === 'active') {
      // If 'active' is in the URL, fetch only active orders based on your business logic
      orders = await Order.findOne({ user_id:userID });
    } else {
      // If 'active' is not in the URL or has a different value, fetch all orders
      orders = await Order.find({ user_id:userID });
    }
    res.json({orders});

  } catch (error) {
    next(error);
  }
};
