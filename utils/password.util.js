// if (payment_method === "online") {
//   try {
//     const paymentResponse = await axios.post(
//       "http://localhost:5000/payment",
//       {
//         amount: razorpayAmount,
//       }
//     );

//     const razorpayPaymentData = paymentResponse.data;
//     if (paymentResponse.status === 200) {
//       order.razorpay_payment = {
//         id: razorpayPaymentData.id,
//         amount: razorpayPaymentData.amount,
//         amount_paid: razorpayPaymentData.amount_paid,
//         amount_due: razorpayPaymentData.amount_due,
//         currency: razorpayPaymentData.currency,
//         receipt: razorpayPaymentData.receipt,
//         entity: razorpayPaymentData.entity,
//         offer_id: razorpayPaymentData.offer_id,
//         status: razorpayPaymentData.status,
//         attempts: razorpayPaymentData.attempts,
//         notes: razorpayPaymentData.notes,
//         created_at: razorpayPaymentData.created_at,
//       };
//       await order.save();
//       return res.status(201).json(order);
//     }

//     return res.status(400).json({ error: "Order processing failed" });
//   } catch (error) {
//     // Handle errors that occurred during the payment processing request
//     console.error("Error processing payment:", error);

//     return res.status(500).json({ error: "Payment processing failed" });
//   }
// }
