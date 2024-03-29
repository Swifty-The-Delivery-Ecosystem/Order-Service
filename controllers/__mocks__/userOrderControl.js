const Order = require("../../models/orderModel");


exports.createOrder = async (req, res, next) => {
  try {
    const { user_id, items, amount, vendor_id, order_instructions, payment_method } = req.body;
    const order = await Order.create({ user_id, items, amount, vendor_id, order_instructions });
    
    // Check if the payment method is online before processing the payment
    if (payment_method === 'online') {
      try {
        // Make a request to the Payment Service API to process the payment
        const paymentResponse = {
            vendor_id: "659be0e2c1d8660c77033d45",
            items: "659be0e2c1d8660c77033d47",
            payment_status: "pending",
            amount: 100,
            user_id: "659be0e2c1d8667c77033d45",
            order_status: "pending",
            _id: "65ae36a4b0d65330a11af66e",
            __v: 0,
            razorpay_payment: {
              id: "order_NRbuH3jHlRUOU2",
              amount: 100,
              amount_paid: 0,
              amount_due: 100,
              currency: "INR",
              receipt: "65ae36a58fb6c0142db01e5b",
              entity: order,
              offer_id: null,
              status: "created",
              attempts: 0,
              notes: [],
              created_at: 1705916069,
              _id: "65ae36a6b0d65330a11af670"
            }
          }
        
  
        const razorpayPaymentData= paymentResponse;
        if (paymentResponse) {
          order.razorpay_payment = {
            id: razorpayPaymentData.id,
            amount: razorpayPaymentData.amount,
            amount_paid: razorpayPaymentData.amount_paid,
            amount_due: razorpayPaymentData.amount_due,
            currency: razorpayPaymentData.currency,
            receipt: razorpayPaymentData.receipt,
            entity: razorpayPaymentData.entity,
            offer_id: razorpayPaymentData.offer_id,
            status: razorpayPaymentData.status,
            attempts: razorpayPaymentData.attempts,
            notes: razorpayPaymentData.notes,
            created_at: razorpayPaymentData.created_at,
          };
          await order.save();
          console.log(order);
          return res.status(201).json(order);
        } 

        return res.status(400).json({ error: 'Order processing failed' });
      } catch (error) {
        // Handle errors that occurred during the payment processing request
        console.error('Error processing payment:', error);
        return res.status(500).json({ error: 'Payment processing failed' });
      }
    }

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrderHistory = async (req, res, next) => {
  try {
    const activeQueryParam = req.params.active;
    const userID = req.params.user_id;
    let orders;

    // Check the 'active' parameter in the URL
    if (activeQueryParam === 'active') {
      // If 'active' is in the URL, fetch only active orders based on your business logic
      orders = await Order.findOne({ user_id:userID });
    } else {
      // If 'active' is not in the URL or has a different value, fetch all orders
      orders = await Order.find({ user_id:userID });
    }
    res.json({orders});

  } catch (error) {
    next(error);
  }
};

exports.updateConfirmedOrderStatus = async(req,res,next)=>{
  try{
    const {orderStatus, order_id} = req.body;
    console.log(req.body)
    if (orderStatus === 'paid'){
      const order = await Order.updateOne({ _id: order_id }, { $set: { payment_status: orderStatus } })
      return res.send("doen");
      // Acknowledge successful processing
      //acknowledgeMessage(message);
    } 
  }catch (error){
    //acknowledgeMessage(message);
  }
}