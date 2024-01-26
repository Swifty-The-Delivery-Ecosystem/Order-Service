const Order = require("../models/orderModel");
const axios = require("axios");

exports.createOrder = async (req, res, next) => {
  try {
    const { user_id, items, amount, vendor_id, order_instructions, payment_method } = req.body;
    const createOrder = {
      user_id:user_id,
      items :items.map(item => ({ menu_item_id: item._id, name:item.name, quantity :item.quantity })),
      amount:amount,
      vendor_id:vendor_id,
      order_instructions:order_instructions,
      payment_method:payment_method
    }
    console.log(createOrder);
    const order = await Order.create(createOrder);
    console.log(payment_method);
    // Check if the payment method is online before processing the payment
    if (payment_method === "online") {
      try {
        // Make a request to the Payment Service API to process the payment
        const paymentResponse = await axios.post(
          "http://localhost:5000/payment",
          {
            amount,
          }
        );

        const razorpayPaymentData = paymentResponse.data;
        if (paymentResponse.status === 200) {
          order.razorpay_payment = {
            id: razorpayPaymentData.id,
            amount: razorpayPaymentData.amount,
            amount_paid: razorpayPaymentData.amount_paid,
            amount_due: razorpayPaymentData.amount_due,
            currency: razorpayPaymentData.currency,
            receipt: razorpayPaymentData.receipt,
            entity: razorpayPaymentData.entity,
            offer_id: razorpayPaymentData.offer_id,
            status: razorpayPaymentData.status,
            attempts: razorpayPaymentData.attempts,
            notes: razorpayPaymentData.notes,
            created_at: razorpayPaymentData.created_at,
          };
          await order.save();
          return res.status(201).json(order);
        }

        return res.status(400).json({ error: "Order processing failed" });
      } catch (error) {
        // Handle errors that occurred during the payment processing request
        console.error("Error processing payment:", error);
        return res.status(500).json({ error: "Payment processing failed" });
      }
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
    console.log(userID);
    // Check the 'active' parameter in the URL
    if (activeQueryParam === "active") {
      // If 'active' is in the URL, fetch only active orders based on your business logic
      orders = await Order.findOne({ user_id: userID });
    } else {
      // If 'active' is not in the URL or has a different value, fetch all orders
      orders = await Order.find({ user_id: userID });
    }
    res.status(201).json({orders});

  } catch (error) {
    next(error);
  }
};
