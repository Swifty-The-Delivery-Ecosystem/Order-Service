const express = require("express");
const vendorOrderController = require("../controllers/vendorOrderController");
const userOrderController = require("../controllers/userOrderController");

const router = express.Router();

router.post("/user", userOrderController.createOrder);

router.get("/user/:active?", userOrderController.getOrderHistory); //Add a query as a parameter to get the latest order status in the frontend.

router.post("/vendor", vendorOrderController.orderStatus);

router.get("/vendor", vendorOrderController.getOrders);

module.exports = router;
