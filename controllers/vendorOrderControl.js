const Order = require("../models/orderModel");
const amqp = require("amqplib");
const { verifyJwtToken } = require("../utils/token.util");
const Ably = require("ably");
const DeliveryPartner = require("../models/deliveryPartner.model");

const client = new Ably.Rest(process.env.ABLY_API_KEY);

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { order_id, status } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: order_id },
      { $set: { order_status: status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const channel = client.channels.get("orderstatus");
    channel.publish("orderstatus", "Your order is " + status + " by Vendor.");

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
exports.updateDeliveryPartner = async (req, res, next) => {
  try {
    const { order_id, delivery_partner_id } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: order_id },
      { $set: { delivery_boy_id: delivery_partner_id } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const delivery_boy = await DeliveryPartner.findById(delivery_partner_id);
    const delivery_boy_name = delivery_boy.name;
    const channel = client.channels.get("orderstatus");
    channel.publish(
      "orderstatus",
      "Your order is picked up by " + delivery_boy_name
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
exports.getOrders = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const orderStatus = req.query.status;
    const vendor_id = verifyJwtToken(token);

    const orders = await Order.find({
      vendor_id: vendor_id,
      order_status: orderStatus,
    });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.updateConfirmedOrderStatus = async (data) => {
  try {
    const order = await Order.updateOne(
      { order_id: data.orderId },
      { $set: { payment_status: "paid" } }
    );

    console.log("Order status updated:", order);
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

// exports.startOrderListener = async () => {
//   const channel = await amqp
//     .connect(
//       "amqps://rbkuvmng:0u5-5pPvLYH0_lt_txFLuMXD4rwgqwaU@puffin.rmq2.cloudamqp.com/rbkuvmng"
//     )
//     .then((conn) => conn.createChannel());
//   const exchangeName = "paymentExchangeDurable1";
//   const routingKey = "paymentSuccess";

//   await channel.assertExchange(exchangeName, "direct", {
//     durable: true,
//     reconnect: true,
//     autoDelete: false,
//   });
//   const queue = await channel.assertQueue("", {
//     exclusive: false,
//     durable: true,
//     autoDelete: false,
//     reconnect: true,
//   });

//   await channel.bindQueue(queue.queue, exchangeName, routingKey);

//   channel.consume(queue.queue, (msg) => {
//     const data = JSON.parse(msg.content.toString());
//     console.log("Received message:", data);
//     exports.updateConfirmedOrderStatus(data);
//     channel.ack(msg);
//   });
// };

// exports.startOrderListener();
