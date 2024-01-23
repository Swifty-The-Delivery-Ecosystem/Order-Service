const app = require('../../../index');
const request = require('supertest');
const randomUtils = require('../../../utils/random.util');

jest.mock('../../../controllers/userOrderControl.js');

describe('POST order/user', function(){

  test('testing ', async ()=>{
    const res = await request(app)
      .post('/api/v1/order_service/user')
      .send({
        user_id:"65aa4b87944c28a8f2548e0a" ,
        items:"65aa4b87944c28a8f2548e0a",
        amount:randomUtils.randomamount(), 
        vendor_id:"65aa4b87944c28a8f2548e0a",
        order_instructions:randomUtils.randomDescription(),
        payment_method:'online'
      })
      .set('Accept', 'application/json');

    if(res.status == 400) {
        
      expect(res.body).toBe( 'Order processing failed');
    
    }
    else if(res.status  == 201) {
        const order = res.body;
       
        expect(order).toHaveProperty('amount');
       
    }
    else{
        expect(res.body).toHaveProperty('error');
    }
  })
})