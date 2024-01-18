const mongoose = require("mongoose");
const OrderItem = require("../models/orderItem");


const orderSchema = mongoose.Schema({
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items:{
    type: mongoose.Schema.Types.ObjectId, // Cart ID
    required: true,
  },
  payment_status: {
    type: String,
    enum: ['paid',  'pending', 'failed'],
    default:'pending'
  },
  order_payment_detail_id:{
    type: mongoose.Schema.Types.ObjectId
  },
  amount: {
    type:Number,
    required:true
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  order_status:{
    type : String,
    enum: ['being cooked',  'departed', 'confirmed', 'declined', 'pending'],
    default:'pending'
  },
  delivery_boy_id:{
    type: mongoose.Schema.Types.ObjectId
  },
  order_instructions:{
    type:String
  }

});

module.exports = mongoose.model("Order", orderSchema);
