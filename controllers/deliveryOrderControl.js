const Order =  require("../models/orderModel");

exports.orderStatusDelivered = async(req,res,next) =>{
 try{
    const {order,status} = req.body;
    const orderDelivered = await Order.findOneAndUpdate(
        { _id: order._id},
        { $set: { order_status: status } },
        { new: true });
        if (!update_availibilty) {
            return res.status(404).json({ error: 'Could not update' });
          }
      
          res.status(200).json("Delivered status updated");
 }
 catch(error){

 }
}