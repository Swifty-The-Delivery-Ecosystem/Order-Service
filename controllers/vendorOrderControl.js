const Order = require("../models/orderModel");
const amqp = require("amqplib");

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { order_id, vendor_id, status } = req.body;

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
    const vendor_id = req.query.vendor_id;

    const orders = await Order.find({
      restaurant_id: vendor_id,
      // payment_status: "paid",
    });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.updateConfirmedOrderStatus = async (data) => {
  try {
    console.log("Reached here");
    const order = await Order.updateOne(
      { _id: data.orderId },
      { $set: { payment_status: "paid" } }
    );

    console.log("Order status updated:", order);
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

exports.startOrderListener = async () => {
  const channel = await amqp
    .connect("amqp://localhost")
    .then((conn) => conn.createChannel());
  const exchangeName = "paymentExchangeDurable1";
  const routingKey = "paymentSuccess";

  await channel.assertExchange(exchangeName, "direct", { durable: true });
  const queue = await channel.assertQueue("", {
    exclusive: false,
    durable: true,
  });

  await channel.bindQueue(queue.queue, exchangeName, routingKey);

  channel.consume(queue.queue, (msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log("Received message:", data);
    exports.updateConfirmedOrderStatus(data);
    channel.ack(msg);
  });
};

exports.startOrderListener();
