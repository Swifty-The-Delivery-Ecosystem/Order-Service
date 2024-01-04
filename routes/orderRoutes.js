const express = require("express");

const {
  createOrder,
  getOrderHistory,
} = require("../controllers/userOrderControl");

const {
  updateOrderStatus,
  getOrders,
} = require("../controllers/vendorOrderControl");

const router = express.Router();

// Add middleware to all the apis below.

router.post("/user", createOrder);

router.get("/user/:active?",getOrderHistory); //Add a query as a parameter to get the latest order status in the frontend.

router.put("/vendor", updateOrderStatus);

router.get("/vendor", getOrders);

module.exports = router;
