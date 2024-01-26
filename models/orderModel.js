const mongoose = require("mongoose");
const OrderItem = require("../models/orderItem");


const razorpay_paymentSchema = mongoose.Schema({
  id: {
    type: String
  },
  amount: Number,
  amount_paid: Number,
  amount_due: Number,
  currency: String,
  receipt: String,
  entity: String,  
  offer_id: String,
  status: String, 
  attempts: Number, 
  notes: [String], 
  created_at: Number, 
});

const orderItemSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  menu_item_id : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity : {
    type : Number
  }
})


const orderSchema = mongoose.Schema({
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items:[{
    type: orderItemSchema, // Cart ID
    required: true,
  }],
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
  },
  razorpay_payment:{
    type:razorpay_paymentSchema
  }
});

module.exports = mongoose.model("Order", orderSchema);
