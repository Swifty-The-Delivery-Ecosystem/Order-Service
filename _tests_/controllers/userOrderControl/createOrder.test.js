const app = require('../../../index');
const request = require('supertest');
const randomUtils = require('../../../utils/random.util');



describe('POST order/user', function(){
  test('response with order details', async ()=>{
    const res = await request(app)
      .post('/api/v1/auth/users/register')
      .send({
        user_id:randomUtils.randomId() ,
        items:randomUtils.randomId(),
        amount:randomUtils.randomId(), 
        vendor_id:randomUtils.randomId(),
        order_instructions:randomUtils.randomDescription(),
        payment_method:randomUtils.randomPaymentStatus()
      })
      .set('Accept', 'application/json');
      console.log(res.status);

    if(res.statusCode == 400) {
        
      expect(res.body).toBe( 'Order processing failed');
    
    }
    else if(res.statusCode  == 200) {
        expect(orderResponse.status).toBe(201);
        const order =res.body;
        expect(order).toHaveProperty('orderId');
        expect(order).toHaveProperty('amount', 100);
        expect(order).toHaveProperty('paymentStatus', 'Paid');
       
    }
    else{
        expect(res.body).toStrictEqual({});
    }
  })
})