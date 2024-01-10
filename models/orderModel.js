const mongoose = require("mongoose");
const OrderItem = require("../models/orderItem");

const orderItemSchema = mongoose.Schema({
  menu_item_id : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity : {
    type : Number,
    required : true
  }
})

const orderSchema = mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  orderItems: [
    orderItemSchema
  ],
  payment_status: {
    type: String,
    enum: ['paid',  'pending', 'failed'],
    default:'pending'
  },
  totalAmount : {
    type:Number,
    required:true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orderStatus:{
    type : String,
    enum: ['being cooked',  'departed', 'confirmed', 'declined', 'pending'],
    default:'pending'
  }

});

module.exports = mongoose.model("Order", orderSchema);
