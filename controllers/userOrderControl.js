const Order = require("../models/orderModel");
const Vendor = require("../models/vendor.model.js");
const axios = require("axios");
const { EventEmitter } = require("events");

const eventEmitter = new EventEmitter();

exports.createOrder = async (req, res, next) => {
  try {
    const {
      user_id,
      items,
      amount,
      vendor_id,
      order_instructions,
      payment_method,
      order_id,
      user_location,
    } = req.body;
    console.log(vendor_id);
    const vendor = await Vendor.findById(vendor_id);
    console.log("hello", vendor);

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    let vendor_name = vendor.restaurantName;
    let vendor_image = vendor.images[0];

    const createOrder = {
      user_id: user_id,
      order_id: order_id,
      items: items.map((item) => ({
        menu_item_id: item.id,
        name: item.name,
        quantity: item.quantity,
      })),
      amount: amount,
      vendor_id: vendor_id,
      order_instructions: order_instructions,
      payment_method: payment_method,
      vendor_name: vendor_name,
      vendor_image: vendor_image,
      user_location: user_location,
    };
    const order = await Order.create(createOrder);
    console.log("saved");
    eventEmitter.emit(`newOrder.${vendor_id}`, order);

    const razorpayAmount = amount * 100;

    // if (payment_method === "online") {
    //   try {
    //     const paymentResponse = await axios.post(
    //       "http://localhost:5000/payment",
    //       {
    //         amount: razorpayAmount,
    //       }
    //     );

    //     const razorpayPaymentData = paymentResponse.data;
    //     if (paymentResponse.status === 200) {
    //       order.razorpay_payment = {
    //         id: razorpayPaymentData.id,
    //         amount: razorpayPaymentData.amount,
    //         amount_paid: razorpayPaymentData.amount_paid,
    //         amount_due: razorpayPaymentData.amount_due,
    //         currency: razorpayPaymentData.currency,
    //         receipt: razorpayPaymentData.receipt,
    //         entity: razorpayPaymentData.entity,
    //         offer_id: razorpayPaymentData.offer_id,
    //         status: razorpayPaymentData.status,
    //         attempts: razorpayPaymentData.attempts,
    //         notes: razorpayPaymentData.notes,
    //         created_at: razorpayPaymentData.created_at,
    //       };
    //       await order.save();
    //       return res.status(201).json(order);
    //     }

    //     return res.status(400).json({ error: "Order processing failed" });
    //   } catch (error) {
    //     // Handle errors that occurred during the payment processing request
    //     console.error("Error processing payment:", error);

    //     return res.status(500).json({ error: "Payment processing failed" });
    //   }
    // }

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.listenForNewOrders = (req, res) => {
  const vendorId = req.params.vendorId;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const listener = (order) => {
    res.write(`data: ${JSON.stringify(order)}\n\n`);
  };
  console.log("done");
  eventEmitter.on(`newOrder.${vendorId}`, listener);

  // Clean up when client disconnects
  req.on("close", () => {
    eventEmitter.off(`newOrder.${vendorId}`, listener);
  });
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const activeQueryParam = req.params.active;
    const userID = req.params.user_id;
    let orders;
    // Check the 'active' parameter in the URL
    if (activeQueryParam === "active") {
      // If 'active' is in the URL, fetch only active orders based on your business logic
      orders = await Order.findOne({ user_id: userID });
    } else {
      // If 'active' is not in the URL or has a different value, fetch all orders
      orders = await Order.find({ user_id: userID });
    }
    res.status(201).json({ orders });
  } catch (error) {
    next(error);
  }
};

exports.getOrderbyId = async (req, res, next) => {
  try {
    const order = await Order.findOne({ order_id: req.query.order_id });
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
};
