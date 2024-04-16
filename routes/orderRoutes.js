const express = require("express");

const {
  createOrder,
  getOrderHistory,
  getOrderbyId,
  listenForNewOrders,
  getRecommendation,
} = require("../controllers/userOrderControl");

const {
  updateOrderStatus,
  getOrders,
  updateConfirmedOrderStatus,
  updateDeliveryPartner,
} = require("../controllers/vendorOrderControl");

const {
  orderStatusDelivered,
  getOrdersDeliveryBoy,
} = require("../controllers/deliveryOrderControl");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const checkVendor = require("../middlewares/checkVendor");
const checkDeliveryPartner = require("../middlewares/checkDeliveryPartner");
// Add middleware to all the apis below.

router.post("/user", checkAuth, createOrder);

router.get("/users/:user_id/:active?", getOrderHistory);

router.put("/vendor/order_update/", checkVendor, updateOrderStatus);

router.get("/vendor", checkVendor, getOrders);

router.put("/orderstatus", checkVendor, updateConfirmedOrderStatus);

router.put("/delivery_status", checkDeliveryPartner, orderStatusDelivered);

router.put("/delivery_boy", checkVendor, updateDeliveryPartner);

router.get("/order", getOrderbyId);

router.get("/events/:vendorId", listenForNewOrders);

router.get("/user/recommend/:user_id", checkAuth, getRecommendation);

router.get("/user/recommendv2/:user_id", checkAuth, getRecommendation);

router.get(
  "/delivery_boy/orders/:delivery_boy_id",
  checkDeliveryPartner,
  getOrdersDeliveryBoy
);

module.exports = router;
