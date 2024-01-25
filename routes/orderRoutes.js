const express = require("express");

const {
  createOrder,
  getOrderHistory,
} = require("../controllers/userOrderControl");

const {
  updateOrderStatus,
  getOrders,
  updateConfirmedOrderStatus,
} = require("../controllers/vendorOrderControl");

const router = express.Router();

// Add middleware to all the apis below.

router.post("/user", createOrder);

router.get("/users/:user_id/:active?", getOrderHistory); //Add a query as a parameter to get the latest order status in the frontend.

router.put("/vendor/order_update", updateOrderStatus);

router.get("/vendor", getOrders);

router.put("/orderstatus", updateConfirmedOrderStatus);

module.exports = router;
