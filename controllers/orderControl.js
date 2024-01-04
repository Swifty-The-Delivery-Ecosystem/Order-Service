const Order = require("../models/order");

exports.createOrder = async (req, res, next) => {
  try {
    const { customerName, items, totalAmount } = req.body;
    const order = await Order.create({ customerName, items, totalAmount });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
