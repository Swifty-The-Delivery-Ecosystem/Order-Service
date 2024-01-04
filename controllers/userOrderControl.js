const Order = require("../models/orderModel");

exports.createOrder = async (req, res, next) => {
  try {
    const {userID, itemsID, totalAmount } = req.body;
    const order = await Order.create({ userID, itemsID, totalAmount });
    //const paymentResult = await PaymentGatewayService.processPayment(order);
    if (paymentResult.success) {
      // Payment successful, update the order status or perform additional actions
      order.status = 'Paid';
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
    const userID = req.body.userID;
    let orders;

    // Check the 'active' parameter in the URL
    if (activeQueryParam === 'active') {
      // If 'active' is in the URL, fetch only active orders based on your business logic
      orders = await Order.findOne({ userID:userID });
    } else {
      // If 'active' is not in the URL or has a different value, fetch all orders
      orders = await Order.find({ userID:userID });
    }
    res.json({ orders });

  } catch (error) {
    next(error);
  }
};
