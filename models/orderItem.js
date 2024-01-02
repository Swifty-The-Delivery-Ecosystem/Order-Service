const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  menu_item_id : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity : {
    type : Number,
    required : true
  }
})

module.exports = mongoose.model('OrderItem', orderItemSchema);