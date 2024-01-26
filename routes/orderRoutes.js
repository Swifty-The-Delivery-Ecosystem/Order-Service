const express = require("express");

const {
  createOrder,
  getOrderHistory,
  updateConfirmedOrderStatus,
} = require("../controllers/userOrderControl");

const {
  updateOrderStatus,
  getOrders,
} = require("../controllers/vendorOrderControl");

const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const checkVendor = require("../middlewares/checkVendor");
// Add middleware to all the apis below.

router.post("/user",checkAuth, createOrder);

router.get("/users/:user_id/:active?",checkAuth, getOrderHistory); //Add a query as a parameter to get the latest order status in the frontend.

router.put("/vendor/order_update", checkVendor, updateOrderStatus);

// router.get("/vendor/:vendor_id", getOrders);

router.put("/orderstatus", updateConfirmedOrderStatus);

module.exports = router;
