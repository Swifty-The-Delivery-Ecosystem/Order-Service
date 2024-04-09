const Order = require("../models/orderModel");
const Vendor = require("../models/vendor.model.js");
const axios = require("axios");
const MenuItem = require("../models/menuItem.model.js");
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
    console.log("vendor_id" + vendor_id);
    const vendor = await Vendor.findById(vendor_id);

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
    eventEmitter.emit(`newOrder.${vendor_id}`, order);

    const razorpayAmount = amount * 100;

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.listenForNewOrders = (req, res) => {
  const vendorId = req.params.vendorId;
  console.log("first", vendorId);
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const listener = (order) => {
    console.log(order);
    return res.write(`data: ${JSON.stringify(order)}\n\n`);
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
exports.getRecommendation = async (req, res, next) => {
  try {
    const userID = req.params.user_id;
    let orders = await Order.find({ user_id: userID })
      .sort({ createdAt: -1 })
      .limit(2);

    const defaultItems = ["Samosa", "Pav Bhaji"];
    const recommendedItemsSet = new Set();

    // Fetch recommendations for default items in parallel
    await Promise.all(
      defaultItems.map(async (itemName) => {
        try {
          const foodItemTitleCase = toTitleCase(itemName);
          const response = await axios.get(
            `https://food-recommendation-yqpc.onrender.com/recommend/${foodItemTitleCase}`
          );
          const recommendedRecipes = response.data.recommended_recipes;

          // Check if recommended items exist in the database
          const dbItems = await MenuItem.find({
            name: { $in: recommendedRecipes },
          });
          dbItems.forEach((item) =>
            recommendedItemsSet.add(JSON.stringify(item))
          );
        } catch (e) {
          console.error("Error fetching recommendations for default item:", e);
        }
      })
    );

    // Fetch recommendations for items in the recent orders
    await Promise.all(
      orders.map(async (order) => {
        const itemName = order.items[0].name;
        const foodItemTitleCase = toTitleCase(itemName);

        try {
          const response = await axios.get(
            `https://food-recommendation-yqpc.onrender.com/recommend/${foodItemTitleCase}`
          );
          const recommendedRecipes = response.data.recommended_recipes;

          // Check if recommended items exist in the database
          const dbItems = await MenuItem.find({
            name: { $in: recommendedRecipes },
          });
          dbItems.forEach((item) =>
            recommendedItemsSet.add(JSON.stringify(item))
          );
        } catch (e) {
          console.error(
            "Error fetching recommendations for recent order item:",
            e
          );
        }
      })
    );

    const recommendedItems = Array.from(recommendedItemsSet).map((item) =>
      JSON.parse(item)
    );
    res.json({ recommendedItems });
  } catch (error) {
    next(error);
  }
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

exports.getOrderbyId = async (req, res, next) => {
  try {
    const order = await Order.findOne({ order_id: req.query.order_id });
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
};
