const app = require('../../../index');
const request = require('supertest');
const randomUtils = require('../../../utils/random.util');

jest.mock('../../../controllers/userOrderControl');

describe('GET /order/order_history', function(){

  test('/api/v1/order_service/users/:user_id/:active?', async ()=>{
    const userId = "65aa4b87944c28a8f2548e0a"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFhNGI4Nzk0NGMyOGE4ZjI1NDhlMDciLCJpYXQiOjE3MDU5MjY0OTEsImV4cCI6MTcwNjM1ODQ5MX0.DtXCxT9iKfeOLegxoA4dBidBNCg0-VclIi3-SxGFakI"
    const res = await request(app)
      .get('/api/v1/order_service/users/'+userId.toString())
      .set('Authorization', "Bearer "+token)
      .set('Accept', 'application/json');
   console.log(res.status)
   if(res.status  == 201 || 200) {
        const orders =res.body.orders;
        expect(orders[0]).toHaveProperty('vendor_id');
        expect(orders[0]).toHaveProperty('items');  
    }
    else{
        expect(res.body).toHaveProperty('error');
    }
  })
})