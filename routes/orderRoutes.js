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

const {
  orderStatusDelivered
} = require("../controllers/deliveryOrderControl")
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const checkVendor = require("../middlewares/checkVendor");
const checkDeliveryPartner = require("../middlewares/checkDeliveryPartner")
// Add middleware to all the apis below.

router.post("/user", checkAuth, createOrder);

router.get("/users/:user_id/:active?", getOrderHistory);

router.put("/vendor/order_update", checkVendor, updateOrderStatus);

router.get("/vendor", checkVendor, getOrders);

router.put("/orderstatus", checkVendor, updateConfirmedOrderStatus);

router.put("/delivery_status", checkDeliveryPartner, orderStatusDelivered)

router.get("/order", getOrderbyId);

module.exports = router;
