const mongoose = require("mongoose");
const OrderItem = require("../models/orderItem");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  orderItems: [
    {
      menu_item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  payment_status: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
