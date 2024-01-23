const app = require('../../../index');
const request = require('supertest');
const randomUtils = require('../../../utils/random.util');


describe('PUT Vendor Order UPadte', function(){

  test('/api/v1/order_service/vendor/order_update', async ()=>{
    const order_id = "65ae6c08cb43b9e058192b9d"
    const status = randomUtils.randomOrderConfirmStatus();
    const vendor_id= "65aa4b87944c28a8f2548e0a";
    const res = await request(app)
      .put('/api/v1/order_service/vendor/order_update')
      .send({
       order_id:order_id,
       status:status,
       vendor_id:vendor_id
      })
      .set('Accept', 'application/json');
    
   if(res.status  == 201 || 200) {
        const order =res.body;
        expect(order).toHaveProperty('vendor_id');
    }
    else{
        expect(res.body).toHaveProperty('error');
    }
  })

})