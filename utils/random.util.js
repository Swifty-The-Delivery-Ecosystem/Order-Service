const randomString = require('randomstring');
const crypto = require('crypto');

exports.randomId = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);

  // Create a random incrementing value (in hex) using randomstring
  const randomValue = randomString.generate({ length: 6, charset: 'hex' });

  // Generate a random string using crypto
  const cryptoRandomValue = crypto.randomBytes(6).toString('hex');
  const id = `${timestamp}${randomValue}${cryptoRandomValue}`;

  return id;
}

exports.randomamount = () => {
  return crypto.randomInt(60, 99+1);
}

exports.randomPaymentStatus = ()=>{
  const paymentStatus = Math.random() < 0.5 ? 'online' : 'offline';

  return paymentStatus;
}

exports.randomDescription = ()=>{
  return randomString.generate(10);

}

