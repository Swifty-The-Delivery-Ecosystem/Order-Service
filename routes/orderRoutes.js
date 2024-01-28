const express = require("express");

const {
  createOrder,
  getOrderHistory,
  getOrderbyId,
} = require("../controllers/userOrderControl");

const {
  updateOrderStatus,
  getOrders,
  updateConfirmedOrderStatus,
} = require("../controllers/vendorOrderControl");

const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const checkVendor = require("../middlewares/checkVendor");
// Add middleware to all the apis below.

router.post("/user", checkAuth, createOrder);

router.get("/users/:user_id/:active?", getOrderHistory);

router.put("/vendor/order_update", checkVendor, updateOrderStatus);

router.get("/vendor", getOrders);

router.put("/orderstatus", updateConfirmedOrderStatus);

router.get("/order", getOrderbyId);

module.exports = router;
