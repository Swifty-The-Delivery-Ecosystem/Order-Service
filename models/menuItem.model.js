const { json } = require("express");
const mongoose = require("mongoose");

// TODO : Apply check on rating cant be changed by restaurant

const MenuItemSchema = mongoose.Schema({
  item_id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please enter a valid name"],
  },
  is_veg: {
    type: Boolean,
  },
  image_url: {
    type: String,
    required: [true, "Provide url for menu item image"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: [true, "Please enter a  quantity"],
  },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Vendor",
  },
  rating: {
    type: Number,
  },
  number_of_ratings: {
    type: Number,
  },
  tags: {
    type: [String],
  },
  category: {
    type: String,
  },
  is_available: {
    type: Boolean,
    default: true,
  },
  nutritional_values: {
    type: String,
  },
  is_healthy: {
    type: Boolean,
  },
  on_offer: {
    type: Boolean,
  },
  offer_price: {
    type: Number,
  },
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
