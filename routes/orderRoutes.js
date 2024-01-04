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

router.get("/user", getOrderHistory); //Add a query as a parameter to get the latest order status in the frontend for the user.

router.put("/vendor", updateOrderStatus);

router.get("/vendor", getOrders);

module.exports = router;
